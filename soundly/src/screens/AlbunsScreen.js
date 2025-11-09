// src/screens/AlbunsScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  StyleSheet 
} from "react-native";

import { getData } from "../services/apiHelpers";

// PALETA DE CORES 
const colors = {
  primary: '#7B2CBF',     // Roxo principal (French violet)
  secondary: '#5A189A',   // Roxo escuro (Russian violet)
  dark: '#240046',        // Roxo muito escuro
  light: '#C77DFF',       // Roxo claro
  accent: '#E0AAFF',      // Roxo muito claro
  background: '#070110',  // Fundo preto azulado
  text: '#FFFFFF',        // Texto branco
  cardBackground: '#100039' // Fundo dos cards
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
    marginBottom: 30,
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
  }
});

// Dados mock baseados na imagem (enquanto a API não carrega)
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

  async function carregarAlbuns() {
    try {
      const dados = await getData("/albums");
      console.log("Álbuns:", dados);
      // Se a API retornar dados, usa eles, senão usa os mocks
      setAlbuns(dados.length > 0 ? dados : mockAlbuns);
    } catch (err) {
      console.error("Falha ao carregar álbuns:", err);
      // Em caso de erro, usa os dados mock
      setAlbuns(mockAlbuns);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAlbuns();
  }, []);

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
      {/* Header com SoundLY */}
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Álbuns</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>FILTROS</Text>
        {/* Aqui podem ser adicionados botões de filtro depois */}
      </View>

      {/* Lista de Álbuns */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {albuns.map((album) => (
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
    </View>
  );
}