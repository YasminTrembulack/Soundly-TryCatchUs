/**
 * /src/screens/AlbunsScreen.js
 * VERSÃO: Sem ícone de play nos cards de álbum
 * Apenas removi o botão play - estrutura mantida intacta
 */

import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  StyleSheet 
} from "react-native";

import { getData } from "../services/apiHelpers";

// PALETA DE CORES (mantida)
const colors = {
  primary: '#7B2CBF',
  secondary: '#5A189A',
  dark: '#240046',
  light: '#C77DFF',
  accent: '#E0AAFF',
  background: '#070110',
  text: '#FFFFFF',
  cardBackground: '#100039'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 42,
    fontWeight: "bold",
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: colors.light,
    marginBottom: 8,
  },
  
  // Grid de álbuns SEM botão play
  albumsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 70,
  },
  albumCard: {
    width: '48%',
    height: 170,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary,
    position: 'relative',
  },
  albumImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 1, 16, 0.4)',
  },
  albumInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 'bold',
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
    fontStyle: 'italic',
  },
  // REMOVIDOS: estilos playButton e playIcon

  // Loading e estados
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.light,
    marginTop: 10,
  },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});

// Dados mock (mantidos)
const mockAlbuns = [
  {
    id: 1,
    title: "Stanboy",
    artist: "The Soundy",
    year: "2008",
    image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
  },
  {
    id: 2,
    title: "Clocks", 
    artist: "Coloring",
    year: "2009",
    image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
  },
  {
    id: 3,
    title: "Espresso",
    artist: "Austrian Chrysomber",
    year: "2004",
    image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
  },
  {
    id: 4,
    title: "Soft Universe",
    artist: "Augsno", 
    year: "2003",
    image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
  },
  {
    id: 5,
    title: "BIRDS OF A FEATHER",
    artist: "BILLION BELLON",
    year: "2006",
    image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
  }
];

export default function AlbunsScreen({ navigation }) {
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  async function carregarAlbuns() {
    try {
      const dados = await getData("/albums");
      setAlbuns(dados.length > 0 ? dados : mockAlbuns);
    } catch (err) {
      console.error("Falha ao carregar álbuns:", err);
      setAlbuns(mockAlbuns);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAlbuns();
  }, []);

  const filteredAlbuns = albuns.filter(album =>
    album.title.toLowerCase().includes(searchText.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Álbuns</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar álbuns..."
          placeholderTextColor={colors.light}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>FILTROS</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.albumsGrid}>
          {filteredAlbuns.map((album) => (
            <TouchableOpacity 
              key={album.id}
              style={styles.albumCard}
              onPress={() => navigation.navigate("Detalhes", { albumId: album.id })}
            >
              <Image 
                source={{ uri: album.image }} 
                style={styles.albumImage}
              />
              <View style={styles.imageOverlay} />
              
              <View style={styles.albumInfo}>
                <Text style={styles.albumTitle} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={styles.albumArtist} numberOfLines={1}>
                  {album.artist}
                </Text>
                <Text style={styles.albumYear}>{album.year}</Text>
              </View>

              {/* REMOVIDO: Botão de play */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={[styles.navIcon, styles.activeNav]}>🎵</Text>
          <Text style={[styles.navLabel, styles.activeNav]}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Playlists')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}