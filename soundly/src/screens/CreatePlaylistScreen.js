import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import globals from "../styles/globals";
import styles from "../styles/createplaylist";
import { PlaylistContext } from "../context/PlaylistContext";
import { UserContext } from "../context/UserContext";
import { PLAYLIST_ICONS } from "../utils/getPlaylistIcon";

export default function CreatePlaylistScreen({ navigation }) {
  const { createPlaylist } = useContext(PlaylistContext);
  const { user } = useContext(UserContext);

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  async function handleCreate() {
    if (!name.trim()) return;

    await createPlaylist(name, user.id, selectedIcon ?? "musical-notes");

    navigation.goBack();
  }

  return (
    <View style={globals.container}>
      <View>
        <View style={globals.header}>
          <Text style={globals.title}>SoundLY</Text>
          <Text style={globals.screenTitle}>Nova Playlist</Text>
        </View>

        {/* Campo de nome */}
        <Text style={globals.label}>Nome da playlist</Text>
        <TextInput
          style={styles.input}
          placeholder="Minha playlist..."
          value={name}
          onChangeText={setName}
        />

        {/* Seleção de ícone */}
        <Text style={globals.label}>Ícone (opcional)</Text>

        <ScrollView
          style={{ maxHeight: 200 }} // controla o tamanho do scroll
          contentContainerStyle={styles.iconGrid}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(PLAYLIST_ICONS).map(([key, icon]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.iconBox,
                selectedIcon === key && styles.iconBoxSelected,
              ]}
              onPress={() => setSelectedIcon(key)}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[globals.button, { marginTop: 20 }]}
          onPress={handleCreate}
        >
          <Text style={globals.buttonText}>Criar Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globals.secundaryButton, { marginTop: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={globals.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
