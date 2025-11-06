import { View, Text, TouchableOpacity } from "react-native";
import globals from "../styles/globals";

export default function DetalhesScreen({ navigation }) {
  return (
    <View style={globals.container}>
      <Text style={globals.title}>Detalhes da Música</Text>
      <Text style={globals.text}>Artista: Exemplo</Text>
      <Text style={globals.text}>Álbum: Exemplo</Text>
      <TouchableOpacity style={globals.button} onPress={() => navigation.goBack()}>
        <Text style={globals.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
