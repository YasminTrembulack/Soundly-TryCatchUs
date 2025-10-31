CREATE DATABASE IF NOT EXISTS soundly;

USE soundly;

-- ==========================================
-- 🎵 Spotify-like Schema
-- ==========================================

CREATE TABLE artists (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    href VARCHAR(255),
    type VARCHAR(50),
    uri VARCHAR(100),
    external_url VARCHAR(255)
);

CREATE TABLE albums (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    release_date DATE,
    total_tracks INT,
    album_type VARCHAR(50),
    href VARCHAR(255),
    uri VARCHAR(100),
    external_url VARCHAR(255)
);

CREATE TABLE album_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id VARCHAR(50) NOT NULL,
    url VARCHAR(500) NOT NULL,
    width INT,
    height INT,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

CREATE TABLE tracks (
    id VARCHAR(50) PRIMARY KEY,
    album_id VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    duration_ms INT,
    explicit BOOLEAN,
    popularity INT,
    preview_url VARCHAR(500),
    is_local BOOLEAN,
    uri VARCHAR(100),
    type VARCHAR(50),
    disc_number INT,
    track_number INT,
    external_id_isrc VARCHAR(50),
    external_url VARCHAR(255),
    href VARCHAR(255),
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL
);

-- Tabela de relacionamento M:N entre tracks e artists
CREATE TABLE track_artists (
    track_id VARCHAR(50),
    artist_id VARCHAR(50),
    PRIMARY KEY (track_id, artist_id),
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);
