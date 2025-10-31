from pydantic import BaseModel
from typing import List, Optional

class AlbumImageSchema(BaseModel):
    url: str
    width: Optional[int]
    height: Optional[int]

    class Config:
        orm_mode = True

class AlbumSchema(BaseModel):
    id: str
    name: str
    release_date: Optional[str]
    total_tracks: Optional[int]
    album_type: Optional[str]
    href: Optional[str]
    uri: Optional[str]
    external_url: Optional[str]
    images: List[AlbumImageSchema] = []

    class Config:
        orm_mode = True

class ArtistSchema(BaseModel):
    id: str
    name: str
    href: Optional[str]
    type: Optional[str]
    uri: Optional[str]
    external_url: Optional[str]

    class Config:
        orm_mode = True

class TrackSchema(BaseModel):
    id: str
    name: str
    duration_ms: Optional[int]
    explicit: Optional[bool]
    popularity: Optional[int]
    preview_url: Optional[str]
    is_local: Optional[bool]
    uri: Optional[str]
    type: Optional[str]
    disc_number: Optional[int]
    track_number: Optional[int]
    external_id_isrc: Optional[str]
    external_url: Optional[str]
    href: Optional[str]
    album: Optional[AlbumSchema]
    artists: List[ArtistSchema] = []

    class Config:
        orm_mode = True
