import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import DetalhesScreen from "../screens/DetalhesScreen";

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
        component={DetalhesScreen}
        options={{ title: "Detalhes da Música" }}
      />
    </Stack.Navigator>
  );
}
