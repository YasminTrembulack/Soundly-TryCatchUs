import { useState, useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

import { getData } from "../services/apiHelpers";
import { PlaylistContext } from "../context/PlaylistContext";
import { UserContext } from "../context/UserContext";

import colors from "../styles/colors";
import globals from "../styles/globals";
import styles from "../styles/albunsdetails";

// Components
import Tabs from "../components/details/Tabs";
import TabContent from "../components/details/TabContent";
import HeaderImage from "../components/details/HeaderImage";
import InfoSection from "../components/details/InfoSection";

export default function DetailsScreen({ route, navigation }) {
  const { getPlaylistsById, getPlaylistsByUserId, removeMusicFromPlaylist } =
    useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const [removeMode, setRemoveMode] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  async function carregarDados(id, type) {
    setLoading(true);
    try {
      if (type === "playlist") {
        const playlistData = await getPlaylistsById(id);
        const tracks = await Promise.all(
          playlistData.tracks.map((id) => getData(`/tracks/${id}`))
        );
        setData({ ...playlistData, tracks });
      } else {
        const endpoint = type === "track" ? `/tracks/${id}` : `/albums/${id}`;
        const res = await getData(endpoint);
        setData(res);
      }

      const userPlaylists = await getPlaylistsByUserId(user.id);
      setPlaylists(userPlaylists);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const { id, type } = route.params;
    setType(type);
    setActiveTab(type === "track" ? "Ações" : "Músicas");
    carregarDados(id, type);
  }, [route.params]);

  if (loading) {
    return (
      <View style={globals.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={globals.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={globals.container}>
      <TouchableOpacity
        style={styles.backIconFloating}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backIconText}>↶</Text>
      </TouchableOpacity>

      <View style={globals.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>
          {type === "track"
            ? "Detalhes da Música"
            : type === "album"
            ? "Detalhes do Álbum"
            : "Detalhes da Playlist"}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.albumHeader}>
          <HeaderImage type={type} data={data} />
          <InfoSection type={type} data={data} />
        </View>
        {type === "playlist" ? (
          <View style={{ display: "flex", flexDirection: "row", gap: "4%" }}>
            <TouchableOpacity
              style={[
                globals.button,
                { marginTop: 10, marginBottom: 10, width: "48%" },
              ]}
              // onPress={}
            >
              <Text style={globals.buttonText}>Deletar playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                globals.button,
                { marginTop: 10, marginBottom: 10, width: "48%" },
                removeMode && { backgroundColor: colors.dark },
              ]}
              onPress={async () => {
                if (removeMode) {
                  // Concluir → remover músicas selecionadas
                  for (const trackId of selectedTracks) {
                    await removeMusicFromPlaylist(data.id, trackId);
                  }

                  // Recarregar dados após remover
                  carregarDados(data.id, "playlist");
                  setSelectedTracks([]);
                }

                setRemoveMode(!removeMode);
              }}
            >
              <Text style={globals.buttonText}>
                {removeMode ? "Concluir" : "Remover músicas"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Tabs type={type} activeTab={activeTab} setActiveTab={setActiveTab} />

        <TabContent
          type={type}
          data={data}
          activeTab={activeTab}
          navigation={navigation}
          playlists={playlists}
          removeMode={removeMode}
          selectedTracks={selectedTracks}
          setSelectedTracks={setSelectedTracks}
        />
      </View>
    </View>
  );
}
