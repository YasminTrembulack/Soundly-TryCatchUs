import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";

export default function MusicasEAlbunsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎵 Soundly</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* SAUDAÇÃO */}
        <Text style={styles.greeting}>Olá, Usuário! 👋</Text>
        
        {/* BARRA DE BUSCA */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>Buscar músicas...</Text>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* CATEGORIAS */}
        <ScrollView horizontal style={styles.categoriesScroll} showsHorizontalScrollIndicator={false}>
          <Text style={[styles.categoryChip, styles.categoryActive]}>Todos</Text>
          <Text style={styles.categoryChip}>Pop</Text>
          <Text style={styles.categoryChip}>Rock</Text>
          <Text style={styles.categoryChip}>Hip Hop</Text>
          <Text style={styles.categoryChip}>Eletrônica</Text>
        </ScrollView>
        
        {/* SEÇÃO: PARA VOCÊ */}
        <Text style={styles.sectionTitle}>🎶 Para Você</Text>
        <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
          <View style={styles.musicCard}>
            <View style={styles.cardImage}>
              <Text style={styles.cardEmoji}>🎵</Text>
            </View>
            <Text style={styles.musicTitle}>Midnight Dreams</Text>
            <Text style={styles.artist}>Luna Shadows</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Pop</Text>
              <Text style={styles.tag}>Eletrônica</Text>
            </View>
          </View>
          
          <View style={styles.musicCard}>
            <View style={styles.cardImage}>
              <Text style={styles.cardEmoji}>🎵</Text>
            </View>
            <Text style={styles.musicTitle}>Urban Echoes</Text>
            <Text style={styles.artist}>The Midnight Club</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Indie</Text>
              <Text style={styles.tag}>Alternativo</Text>
            </View>
          </View>
          
          <View style={styles.musicCard}>
            <View style={styles.cardImage}>
              <Text style={styles.cardEmoji}>🎵</Text>
            </View>
            <Text style={styles.musicTitle}>Electric Soul</Text>
            <Text style={styles.artist}>Neon Waves</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Synthwave</Text>
              <Text style={styles.tag}>Retro</Text>
            </View>
          </View>
        </ScrollView>

        {/* SEÇÃO: ÁLBUNS EM DESTAQUE */}
        <Text style={styles.sectionTitle}>💿 Álbuns em Destaque</Text>
        <View style={styles.albumGrid}>
          <View style={styles.albumCard}>
            <View style={styles.albumImage}>
              <Text style={styles.albumEmoji}>📀</Text>
            </View>
            <Text style={styles.albumTitle}>Noites Azuis</Text>
            <Text style={styles.albumArtist}>Vários Artistas</Text>
          </View>
          <View style={styles.albumCard}>
            <View style={styles.albumImage}>
              <Text style={styles.albumEmoji}>💿</Text>
            </View>
            <Text style={styles.albumTitle}>Coletânea 2024</Text>
            <Text style={styles.albumArtist}>Soundly Hits</Text>
          </View>
          <View style={styles.albumCard}>
            <View style={styles.albumImage}>
              <Text style={styles.albumEmoji}>🎤</Text>
            </View>
            <Text style={styles.albumTitle}>Ao Vivo</Text>
            <Text style={styles.albumArtist}>Banda Local</Text>
          </View>
          <View style={styles.albumCard}>
            <View style={styles.albumImage}>
              <Text style={styles.albumEmoji}>✨</Text>
            </View>
            <Text style={styles.albumTitle}>Indie Collection</Text>
            <Text style={styles.albumArtist}>Artistas Novos</Text>
          </View>
        </View>

        {/* SEÇÃO: ARTISTAS POPULARES */}
        <Text style={styles.sectionTitle}>👤 Artistas Populares</Text>
        <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
          <View style={styles.artistCard}>
            <Text style={styles.artistEmoji}>🎸</Text>
            <Text style={styles.artistName}>Rock Star</Text>
          </View>
          <View style={styles.artistCard}>
            <Text style={styles.artistEmoji}>🎹</Text>
            <Text style={styles.artistName}>DJ Eletro</Text>
          </View>
          <View style={styles.artistCard}>
            <Text style={styles.artistEmoji}>🎤</Text>
            <Text style={styles.artistName}>Pop Queen</Text>
          </View>
          <View style={styles.artistCard}>
            <Text style={styles.artistEmoji}>🥁</Text>
            <Text style={styles.artistName}>Banda Nova</Text>
          </View>
        </ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // FUNDO PRINCIPAL - Do HTML
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C', // --preto
  },
  
  // CABEÇALHO - Estilo do HTML
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1A1A1A', // --cinza-escuro
    borderBottomWidth: 1,
    borderBottomColor: '#0B3B85', // --azul-escuro
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#8FD9FF', // --azul-claro
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#3B82F6', // --azul-medio
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  // CONTEÚDO
  content: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8FD9FF', // --azul-claro
    marginBottom: 20,
    fontFamily: 'Poppins',
  },

  // BARRA DE BUSCA - Do HTML
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', // --cinza-escuro
    padding: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 25,
  },
  searchPlaceholder: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },

  // CATEGORIAS - Do HTML
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(12, 12, 12, 0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.8)',
    marginRight: 12,
    fontSize: 14,
  },
  categoryActive: {
    backgroundColor: 'rgba(143, 217, 255, 0.1)',
    borderColor: '#8FD9FF', // --azul-claro
    color: '#8FD9FF', // --azul-claro
  },

  // SEÇÕES
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8FD9FF', // --azul-claro
    marginTop: 20,
    marginBottom: 15,
    fontFamily: 'Poppins',
  },

  // CARDS DE MÚSICA - Estilo do HTML
  horizontalScroll: {
    flexDirection: 'row',
  },
  musicCard: {
    backgroundColor: '#1A1A1A', // --cinza-escuro
    padding: 16,
    borderRadius: 16,
    marginRight: 15,
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(11, 59, 133, 0.3)',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#0B3B85', // Gradiente do HTML
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  musicTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  artist: {
    color: '#8FD9FF', // --azul-claro
    fontSize: 14,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(143, 217, 255, 0.1)',
    color: '#8FD9FF', // --azul-claro
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(143, 217, 255, 0.3)',
    marginRight: 6,
    marginBottom: 4,
  },

  // GRID DE ÁLBUNS
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumCard: {
    backgroundColor: '#1A1A1A', // --cinza-escuro
    padding: 20,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(11, 59, 133, 0.3)',
  },
  albumImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#0B3B85', // Gradiente do HTML
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  albumEmoji: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  albumTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  albumArtist: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
  },

  // CARDS DE ARTISTAS
  artistCard: {
    backgroundColor: '#1A1A1A', // --cinza-escuro
    padding: 20,
    borderRadius: 50,
    marginRight: 12,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6', // --azul-medio
  },
  artistEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  artistName: {
    color: '#8FD9FF', // --azul-claro
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
});