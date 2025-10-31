# ==============================
# 📦 IMPORTS
# ==============================
from fastapi import FastAPI, Depends, HTTPException, Header, Query
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine, Base
from models import Track, Album, Artist
from schemas import TrackSchema, AlbumSchema, ArtistSchema


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
# 🔹 ENDPOINTS
# ==============================

@app.get("/tracks/", response_model=List[TrackSchema])
def list_tracks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tracks = db.query(Track).offset(skip).limit(limit).all()
    
    for track in tracks:
        if track.album and track.album.release_date:
            track.album.release_date = track.album.release_date.isoformat()
    
    return tracks


@app.get("/albums/", response_model=List[AlbumSchema])  # inclui orm_mode
def list_albums(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    albums = db.query(Album).offset(skip).limit(limit).all()
    
    # Converte release_date para string
    for album in albums:
        if album.release_date:
            album.release_date = album.release_date.isoformat()
    
    return albums


@app.get("/artists/", response_model=List[ArtistSchema])
def list_artists(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    artists = db.query(Artist).offset(skip).limit(limit).all()
    return artists
