import { useFocusEffect } from "@react-navigation/native";
import { useContext, useState, useCallback, useEffect } from "react";
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
import Nav from "../components/nav/nav";

export default function PlaylistsScreen({ route, navigation }) {
  const { getPlaylistsByUserId, addMusicToPlaylist, isMusicInPlaylist } =
    useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTrack, setAddTrack] = useState({});
  const [playlistStatus, setPlaylistStatus] = useState({});

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

  useFocusEffect(
    useCallback(() => {
      const { addTrack = {} } = route.params ?? {};

      setAddTrack(addTrack);

      carregarPlaylists();
    }, [user])
  );

  useEffect(() => {
    async function checkMusic() {
      if (!addTrack || playlists.length === 0) return;

      const status = {};

      for (const p of playlists) {
        let allInside = true;

        for (const trackId of addTrack.tracksId) {
          const exists = await isMusicInPlaylist(p.id, trackId);

          if (!exists) {
            allInside = false;
            break; // já achou uma que não está → pode parar
          }
        }

        status[p.id] = allInside;
      }
      setPlaylistStatus(status);
    }

    checkMusic();
  }, [playlists, addTrack]);

  if (loading) {
    return (
      <View style={globals.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={globals.loadingText}>Carregando playlists...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[globals.container, globals.containerMainPage]}>
        <View style={styles.header}>
          <Text style={globals.title}>SoundLY</Text>
          <Text style={globals.screenTitle}>Playlists</Text>
        </View>

        <TouchableOpacity
          style={globals.button}
          onPress={() => navigation.navigate("CriarPlaylist")}
        >
          <Text style={globals.buttonText}>+ Criar Playlist</Text>
        </TouchableOpacity>

        <ScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {playlists.length === 0 ? (
            <View>
              <Text>Nenhuma playlist encontrada.</Text>
            </View>
          ) : (
            playlists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                style={[
                  styles.playlistCard,
                  playlistStatus[playlist.id] && {
                    borderColor: colors.cardBackground,
                  },
                ]}
                onPress={async () => {
                  if (playlistStatus[playlist.id]) return;
                  console.log("addTrack");
                  console.log(addTrack);
                  
                  if (addTrack && Object.keys(addTrack).length > 0) {
                    for (const trackId in addTrack.tracksId) {
                      await addMusicToPlaylist(playlist.id, trackId);
                    }
                    setPlaylistStatus((prev) => ({
                      ...prev,
                      [playlist.id]: true,
                    }));
                    navigation.setParams({ addTrack: null });
                    setPlaylistStatus({})
                    navigation.navigate("Detalhes", {
                      id: addTrack.albumId ?? addTrack.tracksId[0],
                      type: addTrack.type,
                    });
                  }
                  navigation.setParams({ addTrack: null });
                  setPlaylistStatus({})
                  navigation.navigate("Detalhes", {
                    id: playlist.id,
                    type: "playlist",
                  });
                }}
              >
                <View style={styles.playlistIcon}>
                  <Text style={{ fontSize: 18 }}>
                    {getPlaylistIcon(playlist.icon)}
                  </Text>
                </View>

                <View style={styles.playlistContent}>
                  <Text style={styles.playlistTitle}>
                    {playlist.playlistName}
                  </Text>
                  <Text style={styles.playlistDate}>
                    Criado em:{" "}
                    {new Date(playlist.created_at).toLocaleDateString("pt-BR")}
                  </Text>
                  <Text style={styles.playlistInfo}>
                    {playlist.tracks.length} músicas
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
      <Nav navigation={navigation}></Nav>
    </>
  );
}
