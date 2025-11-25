// src/screens/RegisterScreen.js
import React, { useContext, useState } from 'react';
import globals from "../styles/globals";
import styles from "../styles/auth";
import colors from "../styles/colors";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { PlaylistContext } from '../context/PlaylistContext';

export default function RegisterScreen({ navigation }) {
  const { createPlaylist } = useContext(PlaylistContext);
  const { createUser } = useContext(UserContext);

  // States para os inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Configura o header da tela para não mostrar título
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos!");
      console.log("Erro, Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      console.log("Erro, As senhas não coincidem!");

      return;
    }

    try {
      const newUser = await createUser(username, password, "user");
      await createPlaylist("Favoritos", newUser.id, "favorites")
      Alert.alert("Sucesso", "Conta criada!");
      console.log("Sucesso, Conta criada!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={globals.container}>
      <Text style={globals.soundly}>SoundLY</Text>
      <Text style={globals.subtitle}>CADASTRAR-SE</Text>
      
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu username"
        placeholderTextColor={colors.light}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.light}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirmar Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        placeholderTextColor={colors.light}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CADASTRAR-SE</Text>
      </TouchableOpacity>

      <View style={styles.authContainer}>
        <Text style={styles.authText}>Já possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}