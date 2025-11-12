// src/screens/AlbunsScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  StyleSheet 
} from "react-native";

import { getData } from "../services/apiHelpers";

// PALETA DE CORES
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
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 48,
    fontWeight: "bold",
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
  },
  searchIcon: {
    fontSize: 20,
    color: colors.light,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.light,
    marginBottom: 10,
  },
  albumCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 5,
  },
  albumArtist: {
    fontSize: 16,
    color: colors.light,
    marginBottom: 3,
  },
  albumYear: {
    fontSize: 14,
    color: colors.light,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.light,
    marginTop: 10,
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: colors.light,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: colors.light,
  },
  activeNav: {
    color: colors.accent,
  }
});

// Dados mock
const mockAlbuns = [
  {
    id: 1,
    title: "Bounce price stands...",
    artist: "Stanboy",
    year: "2008"
  },
  {
    id: 2,
    title: "Clocks",
    artist: "The Soundy",
    year: "2008"
  },
  {
    id: 3,
    title: "Coloring",
    artist: "Espresso",
    year: "2009"
  },
  {
    id: 4,
    title: "Austrian Chrysomber",
    artist: "Soft Universe",
    year: "2004"
  },
  {
    id: 5,
    title: "Augsno",
    artist: "BIRDS OF A FEATHER",
    year: "2003"
  },
  {
    id: 6,
    title: "BILLION BELLON",
    artist: "BIRDS OF A FEATHER", 
    year: "2006"
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

  // Filtrar álbuns baseado na pesquisa
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Álbuns</Text>
      </View>

      {/* Barra de Pesquisa */}
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

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>FILTROS</Text>
      </View>

      {/* Lista de Álbuns */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ flex: 1, marginBottom: 10 }}
      >
        {filteredAlbuns.map((album) => (
          <TouchableOpacity 
            key={album.id}
            style={styles.albumCard}
            onPress={() => navigation.navigate("Detalhes", { albumId: album.id })}
          >
            <Text style={styles.albumTitle}>{album.title}</Text>
            <Text style={styles.albumArtist}>{album.artist}</Text>
            <Text style={styles.albumYear}>{album.year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation - ÚNICA NAVEGAÇÃO VISÍVEL */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}} // Já está na tela de Álbuns
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