// src/screens/AlbunsScreen.js
import React, { useEffect, useState } from 'react';
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
} from "react-native";

import { getData } from "../services/apiHelpers";

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
    <View style={globals.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>Álbuns</Text>
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
      <View style={globals.bottomNav}>
        <TouchableOpacity 
          style={globals.navItem}
          onPress={() => {}} // Já está na tela de Álbuns
        >
          <Text style={[globals.navIcon, globals.activeNav]}>🎵</Text>
          <Text style={[globals.navLabel, globals.activeNav]}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globals.navItem}
          onPress={() => navigation.navigate('Playlists')}
        >
          <Text style={globals.navIcon}>📋</Text>
          <Text style={globals.navLabel}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globals.navItem}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={globals.navIcon}>👤</Text>
          <Text style={globals.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}