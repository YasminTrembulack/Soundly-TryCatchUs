import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ListaPontosTuristicos from "./screens/ListaPontosTuristicos";
import DetalhesPontoTuristico from "./screens/DetalhesPontoTuristico";
import { FavoritesProvider } from "./context/FavoritesContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListaPontos">
          <Stack.Screen
            name="ListaPontos"
            component={ListaPontosTuristicos}
            options={{ title: "Pontos Turísticos" }}
          />

          <Stack.Screen
            name="DetalhesPonto"
            component={DetalhesPontoTuristico}
            options={{ title: "Detalhes do Ponto" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
