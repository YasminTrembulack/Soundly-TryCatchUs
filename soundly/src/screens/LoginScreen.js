// src/screens/LoginScreen.js
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

// PALETA DE CORES
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
    marginBottom: 50,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: colors.light,
    fontSize: 16,
  },
  registerLink: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default function LoginScreen({ navigation }) {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Configura o header da tela para não mostrar título
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const user = await login(username, password);
      if (user) {
        Alert.alert('Sucesso', `Bem-vindo, ${user.username}!`);
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoundLY</Text>
      
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu login"
        placeholderTextColor={colors.light}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
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
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Container para o texto de cadastro - CLICÁVEL */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Não possui conta ainda?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}