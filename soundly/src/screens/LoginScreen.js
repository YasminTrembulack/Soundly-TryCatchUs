import { useContext, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";

import globals from "../styles/globals";

import { UserContext } from "../context/UserContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const user = await login(username, password);
      
      if (!user) {
        Alert.alert("Erro", "Usuário ou senha inválidos!");
        return;
      }

      Alert.alert("Sucesso", `Bem-vindo, ${user.username}!`);
  
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={globals.container}>
      <Text style={globals.titleSoundly}>Soundly</Text>

      <TextInput
        style={globals.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={globals.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globals.button} onPress={handleLogin}>
        <Text style={globals.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <Text style={globals.link} onPress={() => navigation.navigate("Register")}>
        Criar conta
      </Text>
    </View>
  );
}
