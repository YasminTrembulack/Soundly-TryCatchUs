import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { formatDuration } from "../../utils/formatDuration";
import globals from "../../styles/globals";
import styles from "../../styles/albunsdetails";

const FALLBACK_IMG =
  "https://i.pinimg.com/736x/7c/2a/d4/7c2ad49c6cad99fe2a7ba402c70cdae8.jpg";

export default function TabContent({
  type,
  data,
  activeTab,
  navigation,
  addMusicToPlaylist,
  playlists,
}) {
  if (activeTab === "Músicas") {
    const tracks =
      type === "track" ? [data] : data.tracks ?? [];

    return (
      <ScrollView style={styles.tracksList}>
        {tracks.map((track) => (
          <TouchableOpacity
            key={track.id}
            style={styles.trackItem}
            onPress={() =>
              navigation.navigate("Detalhes", { id: track.id, type: "track" })
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
        ))}
      </ScrollView>
    );
  }

  // AÇÕES
  return (
    <View>
      <TouchableOpacity style={globals.button}>
        <Text
          style={globals.buttonText}
          onPress={async () => {
            const fav = playlists.find((p) => p.playlistName === "Favoritos");
            await addMusicToPlaylist(fav.id, data.id);
          }}
        >
          Favoritar ❤
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={globals.button}>
        <Text style={globals.buttonText}>Adicionar a Playlist ✚</Text>
      </TouchableOpacity>
    </View>
  );
}
