// src/screens/AlbunsScreen.js
import globals from "../../styles/globals";

import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";


export default function Nav({ navigation }) {
  return (
      <View style={globals.bottomNav}>
        <TouchableOpacity style={globals.navItem} onPress={() => navigation.navigate("Albuns")}>
          <Text style={[globals.navIcon, globals.activeNav]}>🎵</Text>
          <Text style={[globals.navLabel, globals.activeNav]}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globals.navItem}
          onPress={() => navigation.navigate("Playlists")}
        >
          <Text style={globals.navIcon}>📋</Text>
          <Text style={globals.navLabel}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globals.navItem}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Text style={globals.navIcon}>👤</Text>
          <Text style={globals.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
  );
}
