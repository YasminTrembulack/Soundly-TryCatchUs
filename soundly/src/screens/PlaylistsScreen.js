import { View, Text } from "react-native";
import globals from "../styles/globals";


export default function PlaylistsScreen() {
  return (
    <View style={globals.container}>
      <Text style={globals.title}>Minhas Playlists</Text>
    </View>
  );
}
