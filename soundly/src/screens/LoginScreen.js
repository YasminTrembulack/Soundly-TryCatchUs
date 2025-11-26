// src/screens/LoginScreen.js
import React, { useContext, useState } from "react";
import globals from "../styles/globals";
import styles from "../styles/auth";
import colors from "../styles/colors";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { UserContext } from "../context/UserContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Configura o header da tela para não mostrar título
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const user = await login(username, password);
      if (user) {
        Alert.alert("Sucesso", `Bem-vindo, ${user.username}!`);
        navigation.navigate("Albuns");
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={[globals.container, { justifyContent: "center" }]}>
      <View>
        <Text style={globals.soundly}>SoundLY</Text>
        <Text style={globals.subtitle}>LOGIN</Text>

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

        <View style={styles.authContainer}>
          <Text style={styles.authText}>Não possui conta ainda?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
