// src/screens/RegisterScreen.js
import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  StyleSheet 
} from 'react-native';
import { UserContext } from '../context/UserContext';

// PALETA DE CORES (mesma do login)
const colors = {
  primary: '#7B2CBF',     // Roxo principal (French violet)
  secondary: '#5A189A',   // Roxo escuro (Russian violet)
  dark: '#240046',        // Roxo muito escuro
  light: '#C77DFF',       // Roxo claro
  accent: '#E0AAFF',      // Roxo muito claro
  background: '#070110',  // Fundo preto azulado
  text: '#FFFFFF',        // Texto branco
  inputBackground: '#100039' // Fundo dos inputs
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 60,
    fontWeight: "bold",
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: colors.text,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.light,
    fontWeight: '600'
  },
  input: {
    height: 50,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: colors.text
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: colors.light,
    fontSize: 16,
  },
  loginLink: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default function RegisterScreen({ navigation }) {
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
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    try {
      // Cria o usuário no AsyncStorage
      await createUser(username, password, "user");
      Alert.alert("Sucesso", "Conta criada!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoundLY</Text>
      <Text style={styles.subtitle}>CADASTRAR-SE</Text>
      
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

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}