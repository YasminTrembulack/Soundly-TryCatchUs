import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import DetalhesDoAlbumScreen from "../screens/DetalhesDoAlbumScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetalhesDoAlbumScreen}
        options={{ title: "Detalhes da Música" }}
      />
    </Stack.Navigator>
  );
}
