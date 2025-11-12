// App.js - Mantendo sua estrutura atual
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { RobotoCondensed_400Regular, RobotoCondensed_700Bold } from "@expo-google-fonts/roboto-condensed";
import { AnonymousPro_400Regular, AnonymousPro_700Bold } from "@expo-google-fonts/anonymous-pro";
import { Caveat_400Regular, Caveat_700Bold } from "@expo-google-fonts/caveat";
import { NotoSerif_400Regular, NotoSerif_700Bold } from "@expo-google-fonts/noto-serif";

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
    AnonymousPro_400Regular,
    AnonymousPro_700Bold,
    Caveat_400Regular,
    Caveat_700Bold,
    NotoSerif_400Regular,
    NotoSerif_700Bold,
  });

  useEffect(() => {
    // Evita a splash sair antes das fontes carregarem
    SplashScreen.preventAutoHideAsync();

    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Mantém a splash até tudo estar pronto
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}