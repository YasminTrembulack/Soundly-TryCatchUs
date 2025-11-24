// src/screens/AlbunsScreen.js
import { useEffect, useState } from 'react';
import globals from "../styles/globals";
import styles from "../styles/albuns";
import colors from "../styles/colors";
import { 
  View, 
  Text, 
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import { getData } from "../services/apiHelpers";


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
    <View style={globals.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>Álbuns</Text>
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
      <View style={globals.bottomNav}>
        <TouchableOpacity style={globals.navItem} onPress={() => {}}>
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
