# ==============================
# 📦 IMPORTS
# ==============================
import os
import uvicorn

from math import ceil
from typing import  Optional
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, Header, Query

from app.database import SessionLocal, engine, Base
from app.models import Track, Album, Artist
from app.schemas import TrackSchema, AlbumSchema, ArtistSchema


# ==============================
# 🔹 CARREGAR VARIÁVEIS DE AMBIENTE
# ==============================
load_dotenv()
API_KEY = os.getenv("API_KEY")

# ==============================
# 🔹 CONFIGURAÇÃO DO BANCO
# ==============================
Base.metadata.create_all(bind=engine)


# ==============================
# 🔹 INICIALIZAÇÃO DO APP
# ==============================
app = FastAPI(title="Soundly API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==============================
# 🔹 DEPENDÊNCIA DE DB
# ==============================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==============================
# 🔹 DEPENDÊNCIA DE AUTENTICAÇÃO
# ==============================
def verify_api_key(authorization: Optional[str] = Header(None)):
    if API_KEY:
        if authorization != API_KEY:
            raise HTTPException(
                status_code=401,
                detail="API key inválida ou ausente. Use o header Authorization."
            )

# ==============================
# 🔹 ENDPOINTS
# ==============================

@app.get("/", tags=["Root"])
def index():
    return {
        "app_name": "Soundly API",
        "version": "1.0.0",
        "description": "API para gerenciar artistas, álbuns e músicas tipo Spotify",
        "endpoints": {
            "/tracks": "Listagem de músicas com paginação",
            "/albums": "Listagem de álbuns com paginação e imagens",
            "/artists": "Listagem de artistas com paginação"
        },
        "message": "Bem-vindo à Soundly API 🎵"
    }

@app.get("/tracks", dependencies=[Depends(verify_api_key)])
def list_tracks(
    skip: int = Query(0, ge=0), 
    limit: int = Query(10, gt=0),
    db: Session = Depends(get_db)
):
    total = db.query(Track).count()
    tracks = db.query(Track).offset(skip).limit(limit).all()
    
    for track in tracks:
        if track.album and track.album.release_date:
            track.album.release_date = track.album.release_date.isoformat()
    
    return {
        "pagination": {
            "total_items": total,
            "page": (skip // limit) + 1,
            "limit": limit,
            "total_pages": ceil(total / limit),
            "has_next": skip + limit < total,
            "has_previous": skip > 0,
        },
        "data": [TrackSchema.model_validate(track) for track in tracks],
    }


@app.get("/albums", dependencies=[Depends(verify_api_key)])
def list_albums(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, gt=0),
    db: Session = Depends(get_db)
):
    total = db.query(Album).count()
    albums = db.query(Album).offset(skip).limit(limit).all()
    
    for album in albums:
        if album.release_date:
            album.release_date = album.release_date.isoformat()
    
    return {
        "pagination": {
            "total_items": total,
            "page": (skip // limit) + 1,
            "limit": limit,
            "total_pages": ceil(total / limit),
            "has_next": skip + limit < total,
            "has_previous": skip > 0,
        },
        "data": [AlbumSchema.model_validate(album) for album in albums],
    }


@app.get("/artists", dependencies=[Depends(verify_api_key)])
def list_artists(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, gt=0),
    db: Session = Depends(get_db)
):
    total = db.query(Artist).count()
    artists = db.query(Artist).offset(skip).limit(limit).all()
    
    return {
        "pagination": {
            "total_items": total,
            "page": (skip // limit) + 1,
            "limit": limit,
            "total_pages": ceil(total / limit),
            "has_next": skip + limit < total,
            "has_previous": skip > 0,
        },
        "data": [ArtistSchema.model_validate(artist) for artist in artists],
    }


if __name__ == "__main__":
    host = "0.0.0.0"
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 API rodando em: http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=False)