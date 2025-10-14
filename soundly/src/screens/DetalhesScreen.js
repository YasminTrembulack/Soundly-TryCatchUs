import { View, Text, StyleSheet, Button } from "react-native";

export default function DetalhesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Música</Text>
      <Text>Artista: Exemplo</Text>
      <Text>Álbum: Exemplo</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
