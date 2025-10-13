import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
