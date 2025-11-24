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
import { getMainArtist } from "../utils/getMainArtist";
import { getAlbumTotalDuration } from "../utils/getAlbumTotalDuration";

import colors from "../styles/colors";
import styles from "../styles/albunsdetails";
import globals from "../styles/globals";

export default function DetailsScreen({ route, navigation }) {
  const { id, type } = route.params; // type: "track" ou "album"
  const [activeTab, setActiveTab] = useState(type === "album" ? "Músicas" : "Ações");
  const [data, setData] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    setLoading(true);
    try {
      const endpoint = type === "track" ? `/tracks/${id}` : `/albums/${id}`;
      const res = await getData(endpoint);

      setData(res || {});

      // capa da música ou álbum
      if (type === "track") setCoverImg(route.params.trackImg);
      else setCoverImg(res.images?.[0]?.url || null);

      console.log(`${type} carregado:`, res);
    } catch (err) {
      console.error("❌ Falha ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) carregarDados();
  }, [id]);

  const renderTabContent = () => {
    if (!data) return null;

    if (activeTab === "Ações" || type === "track") {
      return (
        <View>
          <TouchableOpacity style={globals.button}>
            <Text style={globals.buttonText}>Favoritar ❤</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globals.button}>
            <Text style={globals.buttonText}>Adicionar a Playlist ✚</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // aba Músicas
    if (type === "album") {
      return (
        <ScrollView
          style={styles.tracksList}
          showsVerticalScrollIndicator={false}
        >
          {data.tracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              style={styles.trackItem}
              onPress={() =>
                navigation.navigate("Detalhes", {
                  id: track.id,
                  type: "track",
                  trackImg: coverImg,
                })
              }
            >
              <Image source={{ uri: coverImg }} style={styles.trackImage} />
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

    // type === "track"
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.trackTitle}>{data.name}</Text>
        {data.artists?.map((artist) => (
          <Text key={artist.id} style={styles.trackArtist}>
            {artist.name}
          </Text>
        ))}
        <Text style={styles.trackDuration}>
          {formatDuration(data.duration_ms)}
        </Text>
      </View>
    );
  };

  function formatReleaseDate(dateString) {
    if (!dateString) return "Data desconhecida";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }


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
          {type === "track" ? "Detalhes da Música" : "Detalhes do Álbum"}
        </Text>
      </View>

      <View style={styles.content}>
        {coverImg && (
          <View style={styles.albumHeader}>
            <Image source={{ uri: coverImg }} style={styles.coverImage} />
            <View style={styles.albumInfo}>
              <Text style={styles.albumTitle}>
                {data?.name ?? "Indisponível"}
              </Text>
              <Text style={styles.artist}>
                {type === "track"
                  ? data.artists?.map((a) => a.name).join(", ")
                  : getMainArtist(data) ?? "Desconhecido"}
              </Text>
              {type === "track" ? (
                <Text style={styles.duration}>
                  {formatDuration(data.duration_ms)}
                </Text>
              ) : (
                <>
                  <Text style={styles.releaseDate}>{formatReleaseDate(data.release_date)}</Text>
                  <Text style={styles.duration}>
                    {getAlbumTotalDuration(data.tracks)}
                  </Text>
                </>
              )}
            </View>
          </View>
        )}

        <View style={styles.tabsContainer}>
          {type === "album" ? (
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
          ) : null}
          <TouchableOpacity
            style={[styles.tab, (activeTab === "Ações" || type === "track")  && styles.activeTab]}
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
