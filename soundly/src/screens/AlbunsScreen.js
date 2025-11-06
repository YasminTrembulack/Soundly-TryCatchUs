import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { getData } from "../services/apiHelpers";

import globals from "../styles/globals";

export default function AlbunsScreen({ navigation }) {
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarAlbuns() {
    try {
      const dados = await getData("/albums");
      console.log("Álbuns:", dados);
      setAlbuns(dados);
    } catch (err) {
      console.error("Falha ao carregar álbuns:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAlbuns();
  }, []);

  return (
    <View style={globals.container}>
      <Text style={globals.title}>Álbuns</Text>
      <TouchableOpacity style={globals.button} onPress={() => navigation.navigate("Detalhes")}>
        <Text style={globals.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
}

