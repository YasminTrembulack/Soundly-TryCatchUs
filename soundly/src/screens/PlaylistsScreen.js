// src/screens/PlaylistsScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

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
  playlistCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistContent: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 5,
  },
  playlistInfo: {
    fontSize: 14,
    color: colors.light,
  },
  playlistDate: {
    fontSize: 12,
    color: colors.light,
    fontStyle: 'italic',
  },
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

// Função para obter ícone baseado no tipo de playlist
const getPlaylistIcon = (iconType) => {
  const icons = {
    'musical-notes': '🎵',
    'heart': '❤️',
    'star': '⭐',
    'headset': '🎧',
    'experiment': '🧪',
    'trophy': '🏆',
    'cloud': '☁️'
  };
  return icons[iconType] || '🎵';
};

// Dados mock de playlists baseados na imagem
const mockPlaylists = [
  {
    id: 1,
    title: "Escape pole studio...",
    songs: 12,
    duration: "45 min",
    date: "29/10/2005",
    icon: 'musical-notes'
  },
  {
    id: 2,
    title: "Favoritas",
    songs: 25,
    duration: "1h 20min",
    date: "29/10/2005",
    icon: 'heart'
  },
  {
    id: 3,
    title: "Musicas boas!!",
    songs: 18,
    duration: "55 min",
    date: "29/10/2005",
    icon: 'star'
  },
  {
    id: 4,
    title: "Electronicsa",
    songs: 15,
    duration: "45 min",
    date: "30/10/2005",
    icon: 'headset'
  },
  {
    id: 5,
    title: "Tests :)",
    songs: 8,
    duration: "25 min",
    date: "30/10/2005",
    icon: 'experiment'
  },
  {
    id: 6,
    title: "Top Musicae",
    songs: 22,
    duration: "1h 15min",
    date: "20/10/2005",
    icon: 'trophy'
  },
  {
    id: 7,
    title: "Relaxx",
    songs: 10,
    duration: "35 min",
    date: "20/10/2005",
    icon: 'cloud'
  }
];

export default function PlaylistsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Playlists</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {mockPlaylists.map((playlist) => (
          <TouchableOpacity 
            key={playlist.id}
            style={styles.playlistCard}
            onPress={() => navigation.navigate("Detalhes", { playlistId: playlist.id })}
          >
            <View style={styles.playlistIcon}>
              <Text style={{ fontSize: 18 }}>
                {getPlaylistIcon(playlist.icon)}
              </Text>
            </View>
            <View style={styles.playlistContent}>
              <Text style={styles.playlistTitle}>{playlist.title}</Text>
              <Text style={styles.playlistInfo}>{playlist.songs} músicas • {playlist.duration}</Text>
              <Text style={styles.playlistDate}>Cristian am: {playlist.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Albuns')}
        >
          <Text style={styles.navIcon}>🎵</Text>
          <Text style={styles.navLabel}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={[styles.navIcon, styles.activeNav]}>📋</Text>
          <Text style={[styles.navLabel, styles.activeNav]}>Playlists</Text>
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