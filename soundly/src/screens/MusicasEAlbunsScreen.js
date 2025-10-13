import { View, Text, StyleSheet, Button } from "react-native";

export default function MusicasEAlbunsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Músicas e Álbuns</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => navigation.navigate("Detalhes")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});
