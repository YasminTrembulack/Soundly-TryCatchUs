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
import { getMainArtist } from "../utils/getMainArtist";
import { formatDuration } from "../utils/formatDuration";
import { getAlbumTotalDuration } from "../utils/getAlbumTotalDuration";

import colors from "../styles/colors";
import styles from "../styles/albunsdetails";
import globals from "../styles/globals";

export default function AlbumDetailsScreen({ route, navigation }) {
  const [activeTab, setActiveTab] = useState("Músicas");
  const [album, setAlbum] = useState(null);
  const [albumImg, setAlbumImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const { albumId } = route.params;

  async function carregarAlbum() {
    setLoading(true);

    try {
      const dados = await getData(`/albums/${albumId}`);
      console.log("Álbum carregado:", dados);

      setAlbum(dados || {});
      setAlbumImg(dados.images[0].url || null);
    } catch (err) {
      console.error("❌ Falha ao carregar álbum:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (albumId) carregarAlbum();
  }, [albumId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Ações":
        return (
          <View>
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
        );
      case "Músicas":
      default:
        return (
          <ScrollView
            style={styles.tracksList}
            showsVerticalScrollIndicator={false}
          >
            {album.tracks.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={styles.trackItem}
                onPress={() => {
                  console.log(`Tocando: ${track.id} - ${track.name}`);
                  navigation.navigate("DetalhesM", {
                    musicId: track.id,
                    trackImg: albumImg,
                  });
                }}
              >
                <Image source={{ uri: albumImg }} style={styles.trackImage} />
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
  };

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
        <Text style={globals.screenTitle}>Detalhes do Álbun</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Cabeçalho do Álbum com Imagem */}
        <View style={styles.albumHeader}>
          <Image source={{ uri: albumImg }} style={styles.coverImage} />
          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>
              {album?.name ?? "Nome indisponível"}
            </Text>

            <Text style={styles.artist}>
              {getMainArtist(album) ?? "Artista desconhecido"}
            </Text>
            <Text style={styles.releaseDate}>{album.release_date}</Text>
            <Text style={styles.releaseDate}>
              {getAlbumTotalDuration(album.tracks)}
            </Text>
            <Text style={styles.duration}>{album.album_type}</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Músicas" && styles.activeTab]}
            onPress={() => setActiveTab("Músicas")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Músicas" && styles.activeTabText,
              ]}
            >
              Músicas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "Ações" && styles.activeTab]}
            onPress={() => setActiveTab("Ações")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Ações" && styles.activeTabText,
              ]}
            >
              Ações
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </View>
    </View>
  );
}
