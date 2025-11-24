// src/screens/PlaylistsScreen.js
import globals from "../styles/globals";
import styles from "../styles/playlists";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';


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
    <View style={globals.container}>
      <View style={styles.header}>
        <Text style={globals.title}>SoundLY</Text>
        <Text style={globals.screenTitle}>Playlists</Text>
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
      <View style={globals.bottomNav}>
        <TouchableOpacity 
          style={globals.navItem}
          onPress={() => navigation.navigate('Albuns')}
        >
          <Text style={globals.navIcon}>🎵</Text>
          <Text style={globals.navLabel}>Álbuns</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globals.navItem}
          onPress={() => {}}
        >
          <Text style={[globals.navIcon, globals.activeNav]}>📋</Text>
          <Text style={[globals.navLabel, globals.activeNav]}>Playlists</Text>
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