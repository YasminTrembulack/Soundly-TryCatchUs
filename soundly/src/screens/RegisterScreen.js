import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { UserContext } from "../context/UserContext";

export default function RegisterScreen({ navigation }) {
  const { createUser, login } = useContext(UserContext);

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
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername} // atualiza o state
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button title="Registrar" onPress={handleRegister} />

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Entrar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  link: { textAlign: "center", color: "blue", marginTop: 10 },
});
