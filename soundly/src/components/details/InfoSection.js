import { View, Text } from "react-native";
import styles from "../../styles/albunsdetails";
import { formatDuration } from "../../utils/formatDuration";
import { getMainArtist } from "../../utils/getMainArtist";
import { getAlbumTotalDuration } from "../../utils/getAlbumTotalDuration";

export default function InfoSection({ type, data }) {
  return (
    <View style={styles.albumInfo}>
      <Text style={styles.albumTitle}>
        {type === "playlist" ? data.playlistName : data?.name ?? "Indisponível"}
      </Text>

      {type !== "playlist" && (
        <Text style={styles.artist}>
          {type === "track"
            ? data.artists?.map((a) => a.name).join(", ")
            : getMainArtist(data) ?? "Desconhecido"}
        </Text>
      )}

      {type === "track" && (
        <Text style={styles.duration}>{formatDuration(data.duration_ms)}</Text>
      )}

      {type === "playlist" && (
        <>
          <Text style={styles.releaseDate}>
            Criado em: {new Date(data.created_at).toLocaleDateString("pt-BR")}
          </Text>
          <Text style={styles.duration}>{data.tracks.length} músicas</Text>
        </>
      )}

      {type === "album" && (
        <>
          <Text style={styles.releaseDate}>
            {new Date(data.release_date).toLocaleDateString("pt-BR")}
          </Text>
          <Text style={styles.duration}>
            {getAlbumTotalDuration(data.tracks)}
          </Text>
        </>
      )}
    </View>
  );
}
