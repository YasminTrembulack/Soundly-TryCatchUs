import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const PlaylistContext = createContext();

const PLAYLIST_KEY = "@Soundly:playlists";

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ======================
  // 🔹 Ler todas playlists
  // ======================
  async function readPlaylists() {
    const data = await AsyncStorage.getItem(PLAYLIST_KEY);
    return data ? JSON.parse(data) : [];
  }

  async function getPlaylistsByUserId(userId) {
    const stored = await readPlaylists();    
    return stored.filter((p) => p.userId === userId);
  }

  async function getPlaylistsById(id) {
    const stored = await readPlaylists();
    return stored.find((p) => p.id === id);
  }

  // ======================
  // 🔹 Salvar playlists
  // ======================
  async function savePlaylists(data) {
    await AsyncStorage.setItem(PLAYLIST_KEY, JSON.stringify(data));
    setPlaylists(data);
  }

  // ======================
  // 🔹 Criar playlist
  // ======================
  async function createPlaylist(playlistName, userId, icon) {
    const stored = await readPlaylists();

    const exists = stored.some(
      (p) => p.playlistName === playlistName && p.userId === userId
    );
    if (exists) throw new Error("Playlist com esse nome já existe!");

    const newPlaylist = {
      id: Date.now().toString(),
      playlistName,
      icon,
      userId,
      created_at: new Date().toISOString(),
      tracks: [],
    };
    console.log("newPlaylist:", newPlaylist);

    
    const updated = [...stored, newPlaylist];
    await savePlaylists(updated);
    return newPlaylist;
  }

  // ======================
  // 🔹 Atualizar playlist
  // ======================
  async function updatePlaylist(updatedPlaylist) {
    const stored = await readPlaylists();
    const index = stored.findIndex((p) => p.id === updatedPlaylist.id);
    if (index === -1) throw new Error("Playlist não encontrada!");

    stored[index] = updatedPlaylist;
    await savePlaylists(stored);
  }

  // ======================
  // 🔹 Deletar playlist
  // ======================
  async function deletePlaylist(id) {
    const stored = await readPlaylists();
    const filtered = stored.filter((p) => p.id !== id);
    await savePlaylists(filtered);
  }

  // ======================
  // 🔹 Buscar todas
  // ======================
  async function getAllPlaylists() {
    return await readPlaylists();
  }

  // ======================
  // 🎵 Adicionar música à playlist
  // ======================
  async function addMusicToPlaylist(playlistId, musicId) {
    const stored = await readPlaylists();
    const playlist = stored.find((p) => p.id === playlistId);
    if (!playlist) throw new Error("Playlist não encontrada!");

    if (!playlist.tracks) playlist.tracks = [];

    if (!playlist.tracks.includes(musicId)) {
      playlist.tracks.push(musicId);
      await savePlaylists(stored);
    }
    console.log("addMusicToPlaylist");
    console.log(playlist);
    
  }

  // ======================
  // 🎵 Remover música da playlist
  // ======================
  async function removeMusicFromPlaylist(playlistId, musicId) {
    const stored = await readPlaylists();
    const playlist = stored.find((p) => p.id === playlistId);
    if (!playlist) throw new Error("Playlist não encontrada!");

    playlist.tracks = playlist.tracks.filter((id) => id !== musicId);
    await savePlaylists(stored);
  }

  // ======================
  // 🎵 Verificar se música está na playlist
  // ======================
  async function isMusicInPlaylist(playlistId, musicId) {
    const stored = await readPlaylists();
    const playlist = stored.find((p) => p.id === playlistId);
    console.log(playlist.tracks);

    return playlist ? playlist.tracks.includes(musicId) : false;
  }

  // ======================
  // 🔹 Inicialização
  // ======================
  useEffect(() => {
    const load = async () => {
      const data = await readPlaylists();
      setPlaylists(data);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        isLoading,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        getAllPlaylists,
        addMusicToPlaylist,
        removeMusicFromPlaylist,
        getPlaylistsById,
        getPlaylistsByUserId,
        isMusicInPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
