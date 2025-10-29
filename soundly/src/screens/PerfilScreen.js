import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import globals from "../styles/globals";

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={globals.container}>
      <Text style={globals.text}>Nome: {user?.full_name}</Text>
      <Text style={globals.text}>Email: {user?.email}</Text>
      <Text style={globals.text}>Role: {user?.role}</Text>
      <TouchableOpacity style={globals.button} onPress={() => logout() }>
        <Text style={globals.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
