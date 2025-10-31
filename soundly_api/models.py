from sqlalchemy import Column, String, Integer, Boolean, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from database import Base

# Relação M:N entre tracks e artists
track_artists = Table(
    "track_artists", Base.metadata,
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
