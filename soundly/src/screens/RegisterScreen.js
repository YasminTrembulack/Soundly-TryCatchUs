
import { useContext, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";

import { UserContext } from "../context/UserContext";
import globals from "../styles/globals";

export default function RegisterScreen({ navigation }) {
  const { createUser } = useContext(UserContext);

  // States para os inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <View style={globals.container}>
      <Text style={globals.title}>Criar Conta</Text>

      <TextInput
        style={globals.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername} // atualiza o state
      />

      <TextInput
        style={globals.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={globals.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={globals.button} onPress={handleRegister}>
        <Text style={globals.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={globals.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Entrar
      </Text>
    </View>
  );
}