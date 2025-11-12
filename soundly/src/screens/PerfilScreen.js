// src/screens/PerfilScreen.js
import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { UserContext } from '../context/UserContext';

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
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cardText: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
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

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SoundLY</Text>
        <Text style={styles.screenTitle}>Perfil</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Usuário: {user?.username || 'Visitante'}</Text>
        <Text style={styles.cardText}>Tipo: {user?.role || 'Usuário'}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

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
          onPress={() => navigation.navigate('Playlists')}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navLabel}>Playlists</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}}
        >
          <Text style={[styles.navIcon, styles.activeNav]}>👤</Text>
          <Text style={[styles.navLabel, styles.activeNav]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}