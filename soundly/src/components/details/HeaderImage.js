import { View, Image, Text } from "react-native";
import playlistStyle from "../../styles/playlists";
import styles from "../../styles/albunsdetails";
import { getPlaylistIcon } from "../../utils/getPlaylistIcon";

const FALLBACK_IMG =
  "https://i.pinimg.com/736x/7c/2a/d4/7c2ad49c6cad99fe2a7ba402c70cdae8.jpg";

export default function HeaderImage({ type, data }) {
  console.log(data);
  
  if (type === "playlist") {
    return (
      <View style={playlistStyle.playlistIcon}>
        <Text style={{ fontSize: 18 }}>{getPlaylistIcon(data.icon)}</Text>
      </View>
    );
  }

  const imageUri =
    type === "album"
      ? data?.images?.[0]?.url
      : data?.album?.images?.[0]?.url;

  return (
    <Image
      style={styles.coverImage}
      source={{ uri: imageUri ?? FALLBACK_IMG }}
    />
  );
}
