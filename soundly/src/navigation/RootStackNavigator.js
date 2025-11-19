// src/navigation/RootStackNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AlbunsScreen from '../screens/AlbunsScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';
import PerfilScreen from '../screens/PerfilScreen';
import DetalhesDoAlbumScreen from '../screens/DetalhesDoAlbumScreen';

const Stack = createNativeStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: '#070110' } // Fundo escuro padrão
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Albuns" component={AlbunsScreen} />
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesDoAlbumScreen} />
    </Stack.Navigator>
  );
}