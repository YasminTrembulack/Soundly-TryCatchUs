# ==============================
# 📦 IMPORTS
# ==============================
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session
from typing import List, Optional

import uvicorn

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

@app.get("/tracks", response_model=List[TrackSchema], dependencies=[Depends(verify_api_key)])
def list_tracks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tracks = db.query(Track).offset(skip).limit(limit).all()
    
    for track in tracks:
        if track.album and track.album.release_date:
            track.album.release_date = track.album.release_date.isoformat()
    
    return tracks


@app.get("/albums", response_model=List[AlbumSchema], dependencies=[Depends(verify_api_key)])
def list_albums(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    albums = db.query(Album).offset(skip).limit(limit).all()
    
    for album in albums:
        if album.release_date:
            album.release_date = album.release_date.isoformat()
    
    return albums


@app.get("/artists", response_model=List[ArtistSchema], dependencies=[Depends(verify_api_key)])
def list_artists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    artists = db.query(Artist).offset(skip).limit(limit).all()
    return artists


if __name__ == "__main__":
    host = "0.0.0.0"
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 API rodando em: http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=False)