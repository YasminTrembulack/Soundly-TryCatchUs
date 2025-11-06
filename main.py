# ==============================
# 📦 IMPORTS
# ==============================
import os
import logging
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
# 🔹 LOGGING
# ==============================
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("soundly_api")

uvicorn_logger = logging.getLogger("uvicorn")
uvicorn_logger.handlers = logger.handlers
uvicorn_logger.setLevel(logging.INFO)


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
        "description": "API REST para gerenciar artistas, álbuns e faixas musicais — semelhante a um catálogo de streaming (tipo Spotify).",
        "message": "🎵 Bem-vindo à Soundly API!",
        "endpoints": {
            "/tracks": {
                "method": "GET",
                "description": "Listagem de músicas com paginação e informações do álbum/artista.",
                "query_params": {
                    "skip": "Número de itens a pular (padrão: 0).",
                    "limit": "Número máximo de itens por página (padrão: 10)."
                },
                "auth": "Requer header Authorization com a API key.",
                "example": "/tracks?skip=0&limit=10"
            },
            "/tracks/{track_id}": {
                "method": "GET",
                "description": "Retorna os detalhes de uma música específica pelo ID.",
                "path_params": {
                    "track_id": "ID único da música."
                },
                "auth": "Requer header Authorization com a API key.",
                "example": "/tracks/123"
            },
            "/albums": {
                "method": "GET",
                "description": "Listagem de álbuns com paginação, imagens e filtros por título ou artista.",
                "query_params": {
                    "skip": "Número de itens a pular (padrão: 0).",
                    "limit": "Número máximo de itens por página (padrão: 10).",
                    "title": "Filtra álbuns contendo este trecho no nome (opcional).",
                    "artist": "Filtra álbuns pelo nome do artista (opcional)."
                },
                "auth": "Requer header Authorization com a API key.",
                "example": "/albums?title=rock&artist=queen"
            },
            "/albums/{album_id}": {
                "method": "GET",
                "description": "Busca um álbum específico pelo ID, incluindo faixas relacionadas.",
                "path_params": {
                    "album_id": "ID único do álbum."
                },
                "auth": "Requer header Authorization com a API key.",
                "example": "/albums/42"
            },
            "/artists": {
                "method": "GET",
                "description": "Listagem de artistas com paginação.",
                "query_params": {
                    "skip": "Número de itens a pular (padrão: 0).",
                    "limit": "Número máximo de itens por página (padrão: 10)."
                },
                "auth": "Requer header Authorization com a API key.",
                "example": "/artists?skip=0&limit=5"
            },
        }
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
    title: Optional[str] = Query(None, description="Parte do nome do álbum"),
    artist: Optional[str] = Query(None, description="Parte do nome do artista"),
    db: Session = Depends(get_db)
):
    
    query = db.query(Album)

    if title:
        query = query.filter(Album.name.ilike(f"%{title}%"))

    if artist:
        query = query.join(Album.artists).filter(Artist.name.ilike(f"%{artist}%"))
    
    total = query.count()
    albums = query.offset(skip).limit(limit).all()
    
    for album in albums:
        if album.release_date:
            album.release_date = album.release_date.isoformat()

    return {
        "filters": {
            "title": title,
            "artist": artist
        },
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


@app.get("/albums/{album_id}", response_model=AlbumSchema, dependencies=[Depends(verify_api_key)])
def get_album_by_id(album_id: str, db: Session = Depends(get_db)):
    album = db.query(Album).filter(Album.id == album_id).first()
    if not album:
        raise HTTPException(status_code=404, detail="Álbum não encontrado.")
    
    if album.release_date:
        album.release_date = album.release_date.isoformat()

    return AlbumSchema.model_validate(album)


@app.get("/tracks/{track_id}", response_model=TrackSchema, dependencies=[Depends(verify_api_key)])
def get_track_by_id(track_id: str, db: Session = Depends(get_db)):
    track = db.query(Track).filter(Track.id == track_id).first()
    if not track:
        raise HTTPException(status_code=404, detail="Música não encontrada.")
    
    track.album.release_date = track.album.release_date.isoformat()

    return TrackSchema.model_validate(track)


# ==============================
# 🚀 MAIN
# ==============================
if __name__ == "__main__":
    host = "0.0.0.0"
    port = int(os.environ.get("PORT", 8000))
    print(f"🚀 API rodando em: http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=False)