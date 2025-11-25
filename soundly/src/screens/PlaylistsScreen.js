import { useContext, useState, useEffect } from "react";
import globals from "../styles/globals";
import styles from "../styles/playlists";
import colors from "../styles/colors";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { PlaylistContext } from "../context/PlaylistContext";
import { getPlaylistIcon } from "../utils/getPlaylistIcon";
import { UserContext } from "../context/UserContext";


export default function PlaylistsScreen({ navigation }) {
  const { getPlaylistsByUserId } = useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega playlists do usuário
  async function carregarPlaylists() {
    if (!user?.id) return;

    setLoading(true);
    try {
      const userPlaylists = await getPlaylistsByUserId(user.id);
      console.log(`Playlists: ${userPlaylists}`);
      
      setPlaylists(userPlaylists);
    } catch (err) {
      console.error("Erro ao carregar playlists:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPlaylists();
  }, [user]);

  if (loading) {
    return (
      <View style={globals.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={globals.loadingText}>Carregando playlists...</Text>
      </View>
    );
  }

  return (
    <View style={globals.container}>
      <View style={styles.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>Playlists</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistCard}
            onPress={() =>
              navigation.navigate("Detalhes", { id: playlist.id, type: "playlist" })
            }
          >
            <View style={styles.playlistIcon}>
              <Text style={{ fontSize: 18 }}>
                {getPlaylistIcon(playlist.icon)}
              </Text>
            </View>
            <View style={styles.playlistContent}>
              <Text style={styles.playlistTitle}>{playlist.playlistName}</Text>
              <Text style={styles.playlistDate}>
                Criado em:{" "}
                {new Date(playlist.created_at).toLocaleDateString("pt-BR")}
              </Text>
              <Text style={styles.playlistInfo}>
                {playlist.tracks.length} músicas
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={globals.bottomNav}>
        <TouchableOpacity
          style={globals.navItem}
          onPress={() => navigation.navigate("Albuns")}
        >
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
    </View>
  );
}
