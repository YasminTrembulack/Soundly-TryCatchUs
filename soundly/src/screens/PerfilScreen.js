import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { UserContext } from "../context/UserContext";

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Nome: {user?.full_name}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Button
        title="Sair"
        onPress={() => logout() }/>
    </View>
  );
}
