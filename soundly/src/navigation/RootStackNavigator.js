import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();

export default function RootStackNavigator() {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="AppStack" component={AppStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
