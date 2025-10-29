import { View, Text, TouchableOpacity } from "react-native";
import globals from "../styles/globals";

export default function MusicasEAlbunsScreen({ navigation }) {
  return (
    <View style={globals.container}>
      <Text style={globals.title}>Músicas e Álbuns</Text>
      <TouchableOpacity style={globals.button} onPress={() => navigation.navigate("Detalhes")}>
        <Text style={globals.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
}

