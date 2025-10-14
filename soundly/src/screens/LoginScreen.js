import { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";


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
    <View style={styles.container}>
      <Text style={styles.title}>Soundly 🎧</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Criar conta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 5, borderRadius: 8 },
  link: { textAlign: "center", color: "blue", marginTop: 10 },
});
