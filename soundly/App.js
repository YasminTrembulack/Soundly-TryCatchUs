import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { RobotoCondensed_400Regular, RobotoCondensed_700Bold} from "@expo-google-fonts/roboto-condensed";
import { AnonymousPro_400Regular, AnonymousPro_700Bold } from "@expo-google-fonts/anonymous-pro";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
    AnonymousPro_400Regular,
    AnonymousPro_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Mantém a splash screen até as fontes carregarem
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