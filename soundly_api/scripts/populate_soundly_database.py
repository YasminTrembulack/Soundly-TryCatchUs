import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy import create_engine, Column, String, Integer, Boolean, ForeignKey, Date, Table
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
import datetime

# ========================
# 🔹 CONFIGURAÇÃO BANCO
# ========================
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/soundly"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# ========================
# 🔹 MODELOS SQLALCHEMY
# ========================

# Relação M:N
track_artists = Table(
    "track_artists",
    Base.metadata,
    Column("track_id", String(50), ForeignKey("tracks.id", ondelete="CASCADE"), primary_key=True),
    Column("artist_id", String(50), ForeignKey("artists.id", ondelete="CASCADE"), primary_key=True),
)

class Artist(Base):
    __tablename__ = "artists"
    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    href = Column(String(255))
    type = Column(String(50))
    uri = Column(String(100))
    external_url = Column(String(255))

    tracks = relationship("Track", secondary=track_artists, back_populates="artists")


class Album(Base):
    __tablename__ = "albums"
    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    release_date = Column(Date)
    total_tracks = Column(Integer)
    album_type = Column(String(50))
    href = Column(String(255))
    uri = Column(String(100))
    external_url = Column(String(255))

    images = relationship("AlbumImage", back_populates="album")
    tracks = relationship("Track", back_populates="album")


class AlbumImage(Base):
    __tablename__ = "album_images"
    id = Column(Integer, primary_key=True, autoincrement=True)
    album_id = Column(String(50), ForeignKey("albums.id", ondelete="CASCADE"))
    url = Column(String(500))
    width = Column(Integer)
    height = Column(Integer)

    album = relationship("Album", back_populates="images")


class Track(Base):
    __tablename__ = "tracks"
    id = Column(String(50), primary_key=True)
    album_id = Column(String(50), ForeignKey("albums.id", ondelete="SET NULL"))
    name = Column(String(255), nullable=False)
    duration_ms = Column(Integer)
    explicit = Column(Boolean)
    popularity = Column(Integer)
    preview_url = Column(String(500))
    is_local = Column(Boolean)
    uri = Column(String(100))
    type = Column(String(50))
    disc_number = Column(Integer)
    track_number = Column(Integer)
    external_id_isrc = Column(String(50))
    external_url = Column(String(255))
    href = Column(String(255))

    album = relationship("Album", back_populates="tracks")
    artists = relationship("Artist", secondary=track_artists, back_populates="tracks")


# ========================
# 🔹 Pydantic Models
# ========================
class SpotifyImage(BaseModel):
    height: int
    width: int
    url: HttpUrl


class SpotifyArtist(BaseModel):
    id: str
    name: str
    href: str
    type: str
    uri: str
    external_urls: dict


class SpotifyAlbum(BaseModel):
    id: str
    name: str
    release_date: str
    total_tracks: int
    album_type: str
    available_markets: List[str]
    href: str
    uri: str
    external_urls: dict
    images: List[SpotifyImage]
    artists: List[SpotifyArtist]


class SpotifyTrack(BaseModel):
    id: str
    name: str
    duration_ms: int
    explicit: bool
    popularity: int
    preview_url: Optional[HttpUrl] = None
    is_local: bool
    uri: str
    type: str
    disc_number: int
    track_number: int
    external_ids: Optional[dict]
    external_urls: dict
    href: str
    available_markets: List[str]
    album: SpotifyAlbum
    artists: List[SpotifyArtist]


# ========================
# 🔹 SPOTIFY API
# ========================
SPOTIFY_DEV_CLIENT_SECRET=os.environ['SPOTIFY_DEV_CLIENT_SECRET']
SPOTIFY_DEV_CLIENT_ID=os.environ['SPOTIFY_DEV_CLIENT_ID']


auth_manager = SpotifyClientCredentials(client_id=SPOTIFY_DEV_CLIENT_ID, client_secret=SPOTIFY_DEV_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)


# 3JxYCQeXAy64gZC1jXRP02 #! 92
# 7C76MN1p9n6GfqkHCjbzxU #! 900
# 4wjjZJW8r5sSv3CyCCab01 #! 306
# 5bKoH0s8rTnFLanGOKCgI8 #! 100
# 1p3wmZOwYi1A1JeSj7XTOf #! 440
# 3XFTlcDyym1mOO2Xgn1khe #! 101
# 6fCNYoIj0C2A53VuCaN503 #! 1.739 
# 4GAH9YrXlZ530xK32DLcpG #! 49
# 1zQNw7zPOx9PN5sucALUq5 #! 88
PLAYLIST_ID = "1zQNw7zPOx9PN5sucALUq5"


# ========================
# 🔹 EXECUÇÃO
# ========================
Base.metadata.create_all(engine)  # cria tabelas

session = SessionLocal()
limit = 100
offset = 0
total_tracks = 0
all_tracks = []

while True:

    results = sp.playlist_items(
        PLAYLIST_ID, 
        additional_types=["track"],
        limit=limit,
        offset=offset
    )

    offset += limit
    total_tracks += len(results["items"])

    items = results["items"]
    if not items:
        break
    
    print(f"➡️ Carregadas {total_tracks} faixas até agora...")

    for item in items:
        track_data = item["track"]
        track_model = SpotifyTrack(**track_data)  # valida com Pydantic
        
        # Verifica se já existe no banco
        if session.get(Track, track_model.id):
            continue

        # Cria ou obtém álbum
        album = session.get(Album, track_model.album.id)
        if not album:
            # 🔹 Converte release_date segura (nem todos têm formato completo)
            try:
                release_date = datetime.date.fromisoformat(track_model.album.release_date)
            except ValueError:
                release_date = datetime.date(1900, 1, 1)

            album = Album(
                id=track_model.album.id,
                name=track_model.album.name,
                release_date=release_date,
                total_tracks=track_model.album.total_tracks,
                album_type=track_model.album.album_type,
                href=track_model.album.href,
                uri=track_model.album.uri,
                external_url=track_model.album.external_urls.get("spotify"),
            )
            session.add(album)

            # 🔹 Adiciona imagens (convertendo HttpUrl → str)
            for img in track_model.album.images:
                session.add(
                    AlbumImage(
                        album=album,
                        url=str(img.url),   # 👈 conversão aqui
                        width=img.width,
                        height=img.height,
                    )
                )

        # Cria faixa (convertendo HttpUrl → str)
        track = Track(
            id=track_model.id,
            album=album,
            name=track_model.name,
            duration_ms=track_model.duration_ms,
            explicit=track_model.explicit,
            popularity=track_model.popularity,
            preview_url=str(track_model.preview_url) if track_model.preview_url else None,  # 👈 conversão
            is_local=track_model.is_local,
            uri=track_model.uri,
            type=track_model.type,
            disc_number=track_model.disc_number,
            track_number=track_model.track_number,
            external_id_isrc=track_model.external_ids.get("isrc") if track_model.external_ids else None,
            external_url=track_model.external_urls.get("spotify"),
            href=track_model.href,
        )
        session.add(track)

        # Cria artistas e relacionamento
        for art in track_model.artists:
            artist = session.get(Artist, art.id)
            if not artist:
                artist = Artist(
                    id=art.id,
                    name=art.name,
                    href=art.href,
                    type=art.type,
                    uri=art.uri,
                    external_url=art.external_urls.get("spotify"),
                )
                session.add(artist)
            track.artists.append(artist)
        
        

session.commit()
session.close()

print("✅ Dados inseridos no banco com sucesso!")