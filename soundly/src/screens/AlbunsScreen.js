/**
 * /src/screens/AlbunsScreen.js
 * Tela principal de álbuns - CORREÇÃO: Erro de componente não definido
 * Não precisa criar nova pasta - usa estrutura existente
 */

import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

// PRIMEIRO definir o componente AlbumCard ANTES de usar
const AlbumCard = ({ album }) => {
  return (
    <TouchableOpacity style={styles.albumCard}>
      <Image 
        source={{ uri: album.image }} 
        style={styles.albumImage}
      />
      <View style={styles.imageOverlay} />
      
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{album.title}</Text>
        <Text style={styles.albumSubtitle}>{album.subtitle}</Text>
      </View>

      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// DEPOIS o componente principal
const AlbunsScreen = () => {
  const albumsData = [
    {
      id: 1,
      title: "Stanboy",
      subtitle: "The Soundy: 2008",
      image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
    },
    {
      id: 2,
      title: "Clocks",
      subtitle: "Coloring: 2009",
      image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
    },
    {
      id: 3,
      title: "Espresso",
      subtitle: "Austrian Chrysomber: 2004",
      image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
    },
    {
      id: 4,
      title: "Soft Universe",
      subtitle: "Augsno: 2003",
      image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
    },
    {
      id: 5,
      title: "BIRDS OF A FEATHER",
      subtitle: "BILLION BELLON: 2006",
      image: "https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/a/avril-lavigne-eventim-1.jpg"
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#100028" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ÁLBUNS</Text>
        <Text style={styles.subtitle}>SoundLY</Text>
      </View>

      {/* Seção Albuns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albuns</Text>
        <Text style={styles.sectionSubtitle}>Bounce price stands...</Text>
        
        {/* Filtros */}
        <View style={styles.filters}>
          <Text style={styles.filtersTitle}>FILTROS</Text>
        </View>

        {/* Grid de Álbuns */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.albumsGrid}>
            {albumsData.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070110',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#100028',
  },
  title: {
    color: '#E0AAFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#C77DFF',
    fontSize: 24,
    fontWeight: '300',
  },
  section: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    color: '#E0AAFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#7B2CBF',
    fontSize: 16,
    marginBottom: 24,
    opacity: 0.8,
  },
  filters: {
    marginBottom: 24,
  },
  filtersTitle: {
    color: '#C77DFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  albumsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumCard: {
    width: '48%',
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#100039',
    position: 'relative',
  },
  albumImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 1, 16, 0.3)',
  },
  albumInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  albumTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  albumSubtitle: {
    color: '#C77DFF',
    fontSize: 12,
    opacity: 0.9,
  },
  playButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(123, 44, 191, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AlbunsScreen;