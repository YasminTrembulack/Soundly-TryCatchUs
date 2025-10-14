import { useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserContext } from "../context/UserContext";

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
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput style={styles.input} placeholder="Nome completo" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <Button title="Registrar" onPress={() => handleRegister()} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Entrar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 5, borderRadius: 8 },
  link: { textAlign: "center", color: "blue", marginTop: 10 },
});
