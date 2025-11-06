import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { getData } from "../services/apiHelpers";

import globals from "../styles/globals";

export default function AlbunsScreen({ navigation }) {
  const [albuns, setAlbuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // quantidade por página

  async function carregarAlbuns(params = {}) {
    setLoading(true);

    try {
      const query = {
        skip: ((params.page || page) - 1) * limit,
        limit,
        title: (params.title ?? title) || undefined,
        artist: (params.artist ?? artist) || undefined,
      };

      const dados = await getData("/albums", query);
      console.log("📀 Álbuns carregados:", dados);

      setAlbuns(dados.data || []);
    } catch (err) {
      console.error("❌ Falha ao carregar álbuns:", err);
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

