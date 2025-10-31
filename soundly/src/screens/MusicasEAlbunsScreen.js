import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

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
      <ScrollView style={styles.content}>
        
        {/* SAUDAÇÃO */}
        <Text style={styles.greeting}>Olá, Usuário! 👋</Text>
        
        {/* SEÇÃO: PARA VOCÊ */}
        <Text style={styles.sectionTitle}>🎶 Para Você</Text>
        <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
          <View style={styles.musicCard}>
            <Text style={styles.emoji}>🎧</Text>
            <Text style={styles.musicTitle}>Música Top</Text>
            <Text style={styles.artist}>Artista Legal</Text>
          </View>
          <View style={styles.musicCard}>
            <Text style={styles.emoji}>🎵</Text>
            <Text style={styles.musicTitle}>Hit do Verão</Text>
            <Text style={styles.artist}>Cantor Famoso</Text>
          </View>
          <View style={styles.musicCard}>
            <Text style={styles.emoji}>🎶</Text>
            <Text style={styles.musicTitle}>Balada Romântica</Text>
            <Text style={styles.artist}>Banda Sensação</Text>
          </View>
          <View style={styles.musicCard}>
            <Text style={styles.emoji}>🔥</Text>
            <Text style={styles.musicTitle}>Track Viral</Text>
            <Text style={styles.artist}>DJ Internacional</Text>
          </View>
        </ScrollView>

        {/* SEÇÃO: ÁLBUNS EM DESTAQUE */}
        <Text style={styles.sectionTitle}>💿 Álbuns em Destaque</Text>
        <View style={styles.albumGrid}>
          <View style={styles.albumCard}>
            <Text style={styles.albumEmoji}>📀</Text>
            <Text style={styles.albumTitle}>Noites Azuis</Text>
            <Text style={styles.albumArtist}>Vários Artistas</Text>
          </View>
          <View style={styles.albumCard}>
            <Text style={styles.albumEmoji}>💿</Text>
            <Text style={styles.albumTitle}>Coletânea 2024</Text>
            <Text style={styles.albumArtist}>Soundly Hits</Text>
          </View>
          <View style={styles.albumCard}>
            <Text style={styles.albumEmoji}>🎤</Text>
            <Text style={styles.albumTitle}>Ao Vivo</Text>
            <Text style={styles.albumArtist}>Banda Local</Text>
          </View>
          <View style={styles.albumCard}>
            <Text style={styles.albumEmoji}>✨</Text>
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
  // FUNDO PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C', // Preto puro
  },
  
  // CABEÇALHO
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1A1A1A', // Cinza escuro
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6', // Azul principal
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8FD9FF', // Azul claro
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#3B82F6', // Azul principal
    borderRadius: 20,
  },
  searchIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  // CONTEÚDO
  content: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // Branco
    marginBottom: 20,
  },

  // SEÇÕES
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BB86FC', // Roxo aceso
    marginTop: 20,
    marginBottom: 10,
  },

  // CARDS DE MÚSICA
  horizontalScroll: {
    flexDirection: 'row',
  },
  musicCard: {
    backgroundColor: '#1A1A1A', // Cinza escuro
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6', // Azul principal
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  musicTitle: {
    color: '#FFFFFF', // Branco
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.7)', // Branco translúcido
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },

  // GRID DE ÁLBUNS
  albumGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  albumCard: {
    backgroundColor: '#1A1A1A', // Cinza escuro
    padding: 20,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#9B6CFC', // Roxo suave
  },
  albumEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  albumTitle: {
    color: '#FFFFFF', // Branco
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  albumArtist: {
    color: 'rgba(255, 255, 255, 0.7)', // Branco translúcido
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },

  // CARDS DE ARTISTAS
  artistCard: {
    backgroundColor: '#1A1A1A', // Cinza escuro
    padding: 20,
    borderRadius: 50,
    marginRight: 12,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8FD9FF', // Azul claro
  },
  artistEmoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  artistName: {
    color: '#FFFFFF', // Branco
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});