/**
 * /src/screens/AlbunsScreen.js
 * VERSÃO: Sem ícone de play nos cards de álbum
 * Apenas removi o botão play - estrutura mantida intacta
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

import { getData } from "../services/apiHelpers";

// PALETA DE CORES (mantida)
const colors = {
  primary: "#7B2CBF",
  secondary: "#5A189A",
  dark: "#240046",
  light: "#C77DFF",
  accent: "#E0AAFF",
  background: "#070110",
  text: "#FFFFFF",
  cardBackground: "#100039",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 42,
    fontWeight: "bold",
    color: colors.accent,
    textAlign: "center",
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    color: colors.light,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light,
    marginBottom: 8,
  },

  // Grid de álbuns SEM botão play
  albumsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  albumCard: {
    width: "48%",
    height: 170,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primary,
    position: "relative",
  },
  albumImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 1, 16, 0.4)",
  },
  albumInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 3,
  },
  albumArtist: {
    fontSize: 11,
    color: colors.light,
    marginBottom: 2,
  },
  albumYear: {
    fontSize: 9,
    color: colors.light,
    fontStyle: "italic",
  },
  // REMOVIDOS: estilos playButton e playIcon

  // Loading e estados
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.light,
    marginTop: 10,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    fontSize: 18,
    color: colors.light,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: colors.light,
  },
  activeNav: {
    color: colors.accent,
  },
});

export default function AlbunsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [filterType, setFilterType] = useState("title"); // title | artist
  const [searchText, setSearchText] = useState("");

  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 50;

  async function carregarAlbums(params = {}) {
    const currentPage = params.page || page;

    if (!params.silent) setLoading(true);

    try {
      const query = {
        skip: (currentPage - 1) * limit,
        limit,
      };

      // aplica somente o filtro selecionado
      if (searchText.trim() !== "") {
        if (filterType === "title") query.title = searchText.trim();
        if (filterType === "artist") query.artist = searchText.trim();
      }

      const dados = await getData("/albums", query);

      setAlbums(dados.data || []);
      setPagination(dados.pagination || {});
    } catch (err) {
      console.error("❌ Falha ao carregar álbuns:", err);
    } finally {
      if (!params.silent) setLoading(false);
    }
  }

  function aplicarFiltro() {
    setPage(1);
    carregarAlbums({ page: 1 });
  }

  function limparFiltros() {
    setSearchText("");
    setSearchText("");
    setPage(1);
    carregarAlbums({ page: 1 });
  }

  function carregarMais(direction) {
    const nextPage = page + direction;

    setPage(nextPage);
    setLoadingMore(true);

    carregarAlbums({ page: nextPage, silent: true }).finally(() =>
      setLoadingMore(false)
    );
  }

  useEffect(() => {
    carregarAlbums();
  }, [filterType]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Carregando álbuns...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Álbuns</Text>
      </View>

      {/* SEARCH + BUTTON */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar..."
          placeholderTextColor={colors.light}
          value={searchText}
          onChangeText={(txt) => setSearchText(txt)}
        />

        <TouchableOpacity
          onPress={aplicarFiltro}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold" }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>FILTROS</Text>

        <TouchableOpacity
          onPress={limparFiltros}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 6,
            marginRight: 8,
            backgroundColor: colors.dark,
          }}
        >
          <Text style={{ color: colors.text }}>Limpar Filtros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("title")}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 6,
            marginRight: 8,
            backgroundColor:
              filterType === "title" ? colors.primary : colors.dark,
          }}
        >
          <Text style={{ color: colors.text }}>Título</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("artist")}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 6,
            marginRight: 8,
            backgroundColor:
              filterType === "artist" ? colors.primary : colors.dark,
          }}
        >
          <Text style={{ color: colors.text }}>Artista</Text>
        </TouchableOpacity>
      </View>

      {/* ALBUM GRID */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.albumsGrid}>
          {albums.map((album) => (
            <TouchableOpacity
              key={album.id}
              style={styles.albumCard}
              onPress={() =>
                navigation.navigate("Detalhes", { albumId: album.id })
              }
            >
              <Image
                source={{ uri: album.images[0].url }}
                style={styles.albumImage}
              />
              <View style={styles.imageOverlay} />

              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle} numberOfLines={1}>
                  {album.name}
                </Text>
                <Text style={styles.albumArtist} numberOfLines={1}>
                  {album.tracks[0].artists[0].name}
                </Text>
                <Text style={styles.albumYear}>{album.year}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* PREVIOUS PAGE */}
          {pagination?.has_previous && (
            <TouchableOpacity
              onPress={() => carregarMais(-1)}
              disabled={loadingMore}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
                marginVertical: 16,
              }}
            >
              {loadingMore ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <Text style={{ color: colors.text, fontWeight: "bold" }}>
                  Página anterior
                </Text>
              )}
            </TouchableOpacity>
          )}

          {/* NEXT PAGE */}
          {pagination?.has_next && (
            <TouchableOpacity
              onPress={() => carregarMais(1)}
              disabled={loadingMore}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
                marginVertical: 16,
              }}
            >
              {loadingMore ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <Text style={{ color: colors.text, fontWeight: "bold" }}>
                  Próxima página
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Text style={[styles.navIcon, styles.activeNav]}>🎵</Text>
          <Text style={[styles.navLabel, styles.activeNav]}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Playlists")}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
