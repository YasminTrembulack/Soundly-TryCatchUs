import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AlbumDetailsScreen from "../screens/AlbumDetailsScreen";

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
        component={AlbumDetailsScreen}
        options={{ title: "Detalhes" }}
      />
    </Stack.Navigator>
  );
}
