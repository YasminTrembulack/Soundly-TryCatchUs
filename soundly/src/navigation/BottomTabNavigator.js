import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MusicasEAlbunsScreen from "../screens/MusicasEAlbunsScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Músicas e Álbuns") iconName = "musical-notes";
          else if (route.name === "Playlists") iconName = "list";
          else if (route.name === "Perfil") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#E91E63",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Músicas e Álbuns" component={MusicasEAlbunsScreen} />
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
