import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useContext } from "react";

import { formatDuration } from "../../utils/formatDuration";
import { PlaylistContext } from "../../context/PlaylistContext";

import globals from "../../styles/globals";
import styles from "../../styles/albunsdetails";
import playlistStyle from "../../styles/playlists";
import colors from "../../styles/colors";

const FALLBACK_IMG =
  "https://i.pinimg.com/736x/7c/2a/d4/7c2ad49c6cad99fe2a7ba402c70cdae8.jpg";

export default function TabContent({
  type,
  data,
  activeTab,
  navigation,
  playlists,
  removeMode,
  selectedTracks,
  setSelectedTracks,
}) {
  const { isMusicInPlaylist, removeMusicFromPlaylist, addMusicToPlaylist } =
    useContext(PlaylistContext);
  const [alreadyFav, setAlreadyFav] = useState(false);

  useEffect(() => {
    const fav = playlists.find((p) => p.playlistName === "Favoritos");
    if (!fav) return;

    async function checkFav() {
      const result = await isMusicInPlaylist(fav.id, data.id);
      setAlreadyFav(result);
    }

    checkFav();
  }, [playlists, data.id]);

  function toggleTrackSelection(trackId) {
    if (selectedTracks.includes(trackId)) {
      setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
    } else {
      setSelectedTracks([...selectedTracks, trackId]);
    }
  }

  if (activeTab === "Músicas") {
    const tracks = type === "track" ? [data] : data.tracks ?? [];

    return (
      <ScrollView style={styles.tracksList}>
        {tracks.length === 0 ? (
          <View style={globals.textView}>
            <Text style={globals.text}>Nenhuma música encontrada.</Text>
          </View>
        ) : (
          tracks.map((track) => (
            <View
              key={track.id}
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: selectedTracks.includes(track.id)
                  ? "rgba(255, 0, 0, 0.2)"
                  : "transparent",
                borderRadius: 8,
                paddingRight: 8,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={[styles.trackItem, { flex: 1 }]}
                onPress={() =>
                  navigation.navigate("Detalhes", {
                    id: track.id,
                    type: "track",
                  })
                }
              >
                <Image
                  style={styles.trackImage}
                  source={{
                    uri:
                      type === "playlist" || type === "track"
                        ? track?.album?.images?.[0]?.url ?? FALLBACK_IMG
                        : data.images?.[0]?.url,
                  }}
                />

                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle}>{track.name}</Text>
                  {track.artists.map((artist) => (
                    <Text key={artist.id} style={styles.trackArtist}>
                      {artist.name}
                    </Text>
                  ))}
                </View>

                <Text style={styles.trackDuration}>
                  {formatDuration(track.duration_ms)}
                </Text>
              </TouchableOpacity>

              {/* BOTÃO DE MARCAR/REMOVER */}
              {removeMode && (
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedTracks.includes(track.id)
                      ? "red"
                      : "#333",
                    padding: 8,
                    borderRadius: 8,
                    marginLeft: 8,
                  }}
                  onPress={() => toggleTrackSelection(track.id)}
                >
                  <Text style={{ color: "#fff", fontSize: 12 }}>Remover</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  if (activeTab === "Comentários") {
    return (
      <ScrollView style={[styles.tracksList]}>
        <TouchableOpacity
          style={[globals.button, { marginBottom: 20 }]}
          onPress={() =>
            navigation.navigate("Comentário", {
              targetId: data.id,
            })
          }
        >
          <Text style={globals.buttonText}>Adicionar Comentário</Text>
        </TouchableOpacity>
        {data.comments.length === 0 ? (
          <View style={globals.textView}>
            <Text style={globals.text}>Nenhum comentários encontrado.</Text>
          </View>
        ) : (
          data.comments.map((comment) => (
            <TouchableOpacity
              style={playlistStyle.playlistCard}
              onPress={() =>
                navigation.navigate("Comentário", {
                  targetId: data.id,
                  existingComment: comment,
                })
              }
            >
              <View style={styles.trackInfo}>
                <Text style={playlistStyle.playlistTitle}>
                  {comment.username}
                </Text>
                <Text style={playlistStyle.playlistInfo}>{comment.text}</Text>
              </View>

              <Text style={playlistStyle.playlistDate}>
                Criado em:{" "}
                {new Date(comment.created_at).toLocaleDateString("pt-BR")}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    );
  }

  // AÇÕES
  return (
    <View>
      <TouchableOpacity
        style={[globals.button, alreadyFav && { backgroundColor: colors.dark }]}
        onPress={async () => {
          const fav = playlists.find((p) => p.playlistName === "Favoritos");

          if (alreadyFav) {
            await removeMusicFromPlaylist(fav.id, data.id);
            setAlreadyFav(false);
          } else {
            await addMusicToPlaylist(fav.id, data.id);
            setAlreadyFav(true);
          }
        }}
      >
        <Text style={globals.buttonText}>
          {alreadyFav ? "Remover dos Favoritos ✘" : "Favoritar ❤"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globals.button}
        onPress={() => {
          navigation.navigate("Playlists", { addTrack: data.id });
        }}
      >
        <Text style={globals.buttonText}>Adicionar a playlist</Text>
      </TouchableOpacity>
    </View>
  );
}
