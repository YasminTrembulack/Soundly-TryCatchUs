import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import globals from "../styles/globals";

import { UserContext } from "../context/UserContext";

export default function LoginScreen({ navigation }) {

  const { login } = useContext(UserContext);

  const handleLogin = () => {
    const userData = {
      full_name: "Yasmin Trembulack",
      email: "yasmin@example.com",
      role: "admin",
    };

    login(userData);
  };

  return (
    <View style={globals.container}>
      <Text style={globals.title}>Soundly 🎧</Text>

      <TextInput style={globals.input} placeholder="Email" />
      <TextInput style={globals.input} placeholder="Senha" secureTextEntry />

      <TouchableOpacity style={globals.button} onPress={handleLogin}>
        <Text style={globals.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={globals.link} onPress={() => navigation.navigate("Register")}>
        Criar conta
      </Text>
    </View>
  );
}
