import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { getData } from "../services/apiHelpers";
import { formatDuration } from "../utils/formatDuration";

import colors from "../styles/colors";
import styles from "../styles/albunsdetails";
import globals from "../styles/globals";

export default function MusicDetailsScreen({ route, navigation }) {
  const [activeTab, setActiveTab] = useState("Músicas");
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { musicId } = route.params;
  const { trackImg } = route.params;

  async function carregarMusica() {
    setLoading(true);

    try {
      const dados = await getData(`/tracks/${musicId}`);
      console.log("Música carregada:", dados);

      setTrack(dados || {});
    } catch (err) {
      console.error("❌ Falha ao carregar música:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (musicId) carregarMusica();
  }, [musicId]);

  if (loading) {
    return (
      <View style={globals.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={globals.loadingText}>Carregando álbuns...</Text>
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

      {/* Header */}
      <View style={globals.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>Detalhes do Álbum</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Cabeçalho do Álbum com Imagem */}
        <View style={styles.albumHeader}>
          <Image source={{ uri: trackImg }} style={styles.coverImage} />
          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>
              {track?.name ?? "Nome indisponível"}
            </Text>

            {track.artists.map((artist) => (
              <Text key={artist.id} style={styles.artist}>
                {artist.name}
              </Text>
            ))}
            <Text style={styles.releaseDate}>
              {formatDuration(track.duration_ms)}
            </Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <View style={styles.activeTab}></View>
        </View>

        <TouchableOpacity
          // onPress={}
          style={globals.button}
        >
          <Text style={globals.buttonText}>Favoritar ❤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={}
          style={globals.button}
        >
          <Text style={globals.buttonText}>Adicionar a Playlist ✚</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
