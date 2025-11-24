// src/screens/PlaylistsScreen.js
import React from 'react';
import globals from "../styles/globals";
import styles from "../styles/playlists";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';

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
            <Text style={styles.playlistTitle}>{playlist.title}</Text>
            <Text style={styles.playlistInfo}>{playlist.songs} músicas • {playlist.duration}</Text>
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