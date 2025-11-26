// src/screens/AlbunsScreen.js
import { useEffect, useState } from "react";
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
import { getMainArtist } from "../utils/getMainArtist";
import Nav from "../components/nav/nav";

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
    const text = params.searchText ?? searchText;

    if (!params.silent) setLoading(true);

    try {
      const query = {
        skip: (currentPage - 1) * limit,
        limit,
      };

      // aplica somente o filtro selecionado
      if (text.trim() !== "") {
        if (filterType === "title") query.title = text.trim();
        if (filterType === "artist") query.artist = text.trim();
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
    setPage(1);
    carregarAlbums({ page: 1, searchText: "" });
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

  // if (loading) {
  //   return (
  //     <View style={globals.loadingContainer}>
  //       <ActivityIndicator size="large" color={colors.accent} />
  //       <Text style={globals.loadingText}>Carregando álbuns...</Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <View style={[globals.container, globals.containerMainPage]}>
        {/* HEADER */}
        <View style={globals.header}>
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
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              Buscar
            </Text>
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        <View style={styles.filtersContainer}>
          {/* <Text style={styles.filtersTitle}>FILTROS</Text> */}

          <TouchableOpacity onPress={limparFiltros} style={styles.filterTag}>
            <Text style={styles.filterTagText}>Limpar Filtros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterType("title")}
            style={[
              styles.filterTag,
              {
                backgroundColor:
                  filterType === "title" ? colors.primary : colors.dark,
              },
            ]}
          >
            <Text style={styles.filterTagText}>Título</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFilterType("artist")}
            style={[
              styles.filterTag,
              {
                backgroundColor:
                  filterType === "artist" ? colors.primary : colors.dark,
              },
            ]}
          >
            <Text style={styles.filterTagText}>Artista</Text>
          </TouchableOpacity>
        </View>

        {/* ALBUM GRID */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {albums.length === 0 ? (
            <View style={globals.textView}>
              <Text style={globals.text}>Nenhum album encontrado.</Text>
            </View>
          ) : (
            <View style={styles.albumsGrid}>
              {loading ? (
                <View style={[globals.loadingContainer, {marginTop: 10}]}>
                  <ActivityIndicator size="large" color={colors.accent} />
                  <Text style={globals.loadingText}>Carregando álbuns...</Text>
                </View>
              ) : (
                albums.map((album) => (
                  <TouchableOpacity
                    key={album.id}
                    style={styles.albumCard}
                    onPress={() =>
                      navigation.navigate("Detalhes", {
                        id: album.id,
                        type: "album",
                      })
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
                        {getMainArtist(album)}
                      </Text>
                      <Text style={styles.albumYear}>{album.year}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}

              {/* PREVIOUS PAGE */}
              {pagination?.has_previous && !loading && (
                <TouchableOpacity
                  onPress={() => carregarMais(-1)}
                  disabled={loadingMore}
                  style={globals.button}
                >
                  {loadingMore ? (
                    <ActivityIndicator color={colors.text} />
                  ) : (
                    <Text style={globals.buttonText}>Página anterior</Text>
                  )}
                </TouchableOpacity>
              )}

              {/* NEXT PAGE */}
              {pagination?.has_next && !loading && (
                <TouchableOpacity
                  onPress={() => carregarMais(1)}
                  disabled={loadingMore}
                  style={globals.button}
                >
                  {loadingMore ? (
                    <ActivityIndicator color={colors.text} />
                  ) : (
                    <Text style={globals.buttonText}>Próxima página</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </View>
      <Nav navigation={navigation}></Nav>
    </>
  );
}
