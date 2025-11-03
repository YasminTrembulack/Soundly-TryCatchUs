import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function PlaylistsScreen({ navigation }) {
  // 📝 DADOS FICTÍCIOS - Playlists do usuário
  const playlists = [
    { id: 1, nome: "Minhas Favoritas", musicas: 24, emoji: "❤️" },
    { id: 2, nome: "Rock Clássico", musicas: 18, emoji: "🎸" },
    { id: 3, nome: "Para Estudar", musicas: 32, emoji: "📚" },
    { id: 4, nome: "Party Hits", musicas: 15, emoji: "🎉" },
    { id: 5, nome: "Chill Out", musicas: 22, emoji: "🌙" },
    { id: 6, nome: "Workout", musicas: 28, emoji: "💪" },
  ];

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 Minhas Playlists</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView style={styles.content}>
        
        {/* BOTÃO CRIAR NOVA PLAYLIST */}
        <TouchableOpacity style={styles.createPlaylistCard} activeOpacity={0.7}>
          <Text style={styles.createIcon}>🎵</Text>
          <Text style={styles.createText}>Criar Nova Playlist</Text>
        </TouchableOpacity>

        {/* LISTA DE PLAYLISTS */}
        <Text style={styles.sectionTitle}>Suas Playlists</Text>
        
        {playlists.map(playlist => (
          <TouchableOpacity 
            key={playlist.id} 
            style={styles.playlistCard}
            activeOpacity={0.8}
          >
            <View style={styles.playlistHeader}>
              <Text style={styles.playlistEmoji}>{playlist.emoji}</Text>
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistName}>{playlist.nome}</Text>
                <Text style={styles.playlistCount}>{playlist.musicas} músicas</Text>
              </View>
            </View>
            <Text style={styles.moreIcon}>⋯</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
}

// 🎨 ESTILOS - Mesmo tema da Home
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
  addButton: {
    padding: 10,
    backgroundColor: '#3B82F6', // Azul principal
    borderRadius: 20,
  },
  addIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  // CONTEÚDO
  content: {
    flex: 1,
    padding: 16,
  },

  // CARD CRIAR NOVA PLAYLIST
  createPlaylistCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#BB86FC', // Roxo
    borderStyle: 'dashed',
  },
  createIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  createText: {
    color: '#BB86FC', // Roxo
    fontSize: 16,
    fontWeight: 'bold',
  },

  // SEÇÃO
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BB86FC', // Roxo
    marginBottom: 15,
  },

  // CARD DE PLAYLIST
  playlistCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#3B82F6', // Azul
  },
  playlistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playlistEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playlistCount: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  moreIcon: {
    fontSize: 20,
    color: '#8FD9FF', // Azul claro
    fontWeight: 'bold',
  },
});