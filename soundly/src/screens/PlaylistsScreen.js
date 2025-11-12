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

// Dados mock de playlists
const mockPlaylists = [
  {
    id: 1,
    title: "Minhas Favoritas",
    songs: 15,
    duration: "45 min"
  },
  {
    id: 2,
    title: "Rock Clássico",
    songs: 20,
    duration: "1h 30min"
  },
  {
    id: 3,
    title: "Para Estudar",
    songs: 10,
    duration: "35 min"
  },
  {
    id: 4,
    title: "Workout Mix",
    songs: 25,
    duration: "1h 45min"
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
            <Text style={styles.playlistTitle}>{playlist.title}</Text>
            <Text style={styles.playlistInfo}>{playlist.songs} músicas • {playlist.duration}</Text>
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