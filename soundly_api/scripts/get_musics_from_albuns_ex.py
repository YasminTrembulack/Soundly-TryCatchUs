import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# 1️⃣ Coloque seu client ID e client secret aqui
SPOTIFY_DEV_CLIENT_SECRET="2813d7750328402e9e4c0b767618c0ef"
SPOTIFY_DEV_CLIENT_ID="2766d07fb3a04ed098725274d29770c9"


# 2️⃣ Autenticação
auth_manager = SpotifyClientCredentials(client_id=SPOTIFY_DEV_CLIENT_ID, client_secret=SPOTIFY_DEV_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

# 3️⃣ ID da playlist "Top 50 Global" (Spotify)
TOP_50_GLOBAL_PLAYLIST_ID = "5bKoH0s8rTnFLanGOKCgI8"

# 4️⃣ Pega as músicas da playlist
results = sp.playlist_items(TOP_50_GLOBAL_PLAYLIST_ID, additional_types=['track'])

print("🎵 Top 50 Global Spotify:")
for i, item in enumerate(results['items'], start=1):
    track = item['track']
    artist_names = ", ".join([artist['name'] for artist in track['artists']])
    name = track["name"]
    album = track["album"]["name"]
    release_date = track["album"]["release_date"]
    popularity = track["popularity"]
    duration = round(track["duration_ms"] / 1000 / 60, 2)
    link = track["external_urls"]["spotify"]
    cover = track["album"]["images"][0]["url"]
    
    print(f"🎵 {name} - {artist_names}")
    print(f"Álbum: {album} ({release_date})")
    print(f"Popularidade: {popularity}")
    print(f"Duração: {duration} min")
    print(f"Capa: {cover}")
    print(f"Spotify: {link}")
    break

# https://open.spotify.com/playlist/5bKoH0s8rTnFLanGOKCgI8?si=RiIL1aXyRteTAC0oI2Zebg
