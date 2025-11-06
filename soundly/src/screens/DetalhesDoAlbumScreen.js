import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getData } from "../services/apiHelpers";
import globals from "../styles/globals";

export default function DetalhesDoAlbumScreen({ route, navigation }) {
  const { albumId } = '01sfgrNbnnPUEyz6GZYlt9';// route.params;
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregarAlbum() {
    setLoading(true);

    try {
      const dados = await getData(`/albums/${albumId}`);
      console.log("Álbum carregado:", dados);

      setAlbum(dados.data || null);
    } catch (err) {
      console.error("❌ Falha ao carregar álbum:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (albumId) carregarAlbum();
  }, [albumId]);

  return (
    <View style={globals.container}>
      <Text style={globals.title}>Detalhes da Música</Text>
      {loading ? (
        <Text style={globals.text}>Carregando...</Text>
      ) : (
        <Text style={globals.text}>Álbum: {album.name}</Text>
      )}
      
      <TouchableOpacity style={globals.button} onPress={() => navigation.goBack()}>
        <Text style={globals.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
