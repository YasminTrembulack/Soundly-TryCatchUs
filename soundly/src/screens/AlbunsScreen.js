import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { getData } from "../services/apiHelpers";

import globals from "../styles/globals";

export default function AlbunsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // quantidade por página

  async function carregarAlbums(params = {}) {
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

      setAlbums(dados.data || []);
    } catch (err) {
      console.error("❌ Falha ao carregar álbums:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAlbums();
  }, [albums]);

  return (
    <View style={globals.container}>
      <Text style={globals.title}>Álbuns</Text>
      {loading ? (
        <Text style={globals.text}>Carregando...</Text>
      ) : (
        albums.map((album) => (
          <Text key={album.id} style={globals.text}>
            {album.name}
          </Text>
        ))
      )}
      <TouchableOpacity
        style={globals.button}
        onPress={() => navigation.navigate("Detalhes")}
      >
        <Text style={globals.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
}
