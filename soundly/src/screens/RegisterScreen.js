import { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import globals from "../styles/globals";

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(UserContext);

  const handleRegister = () => {
    const userData = {
      full_name: "Yasmin Trembulack",
      email: "yasmin@example.com",
      role: "admin",
    };

    login(userData); 
  };

  return (
    <View style={globals.container}>
      <Text style={globals.title}>Criar Conta</Text>
      <TextInput style={globals.input} placeholder="Nome completo" />
      <TextInput style={globals.input} placeholder="Email" />
      <TextInput style={globals.input} placeholder="Senha" secureTextEntry />
      <TouchableOpacity style={globals.button} onPress={() => handleRegister() }>
        <Text style={globals.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <Text style={globals.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Entrar
      </Text>
    </View>
  );
}