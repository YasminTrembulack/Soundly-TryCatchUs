// src/context/UserContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
const USERS_KEY = "@Soundly:users";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lê todos os usuários do AsyncStorage
  async function readUsers() {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Salva todos os usuários no AsyncStorage
  async function saveUsers(users) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // Criar usuário
  async function createUser(username, password, role) {
    const users = await readUsers();

    // Verifica se o username já existe
    const exists = users.some((u) => u.username === username);
    if (exists) throw new Error("Username já cadastrado!");

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      role
    };

    users.push(newUser);
    await saveUsers(users);
    return newUser;
  }

  // Login (busca usuário pelo username e senha) - CORRIGIDA
  async function login(username, password) {
    const users = await readUsers();
    const foundUser = users.find((u) => u.username === username && u.password === password);
    
    if (!foundUser) {
      throw new Error("Usuário ou senha incorretos!");
    }
    
    setUser(foundUser);
    return foundUser;
  }

  // Logout
  function logout() {
    setUser(null);
  }

  // Atualizar usuário (ex: mudar senha)
  async function updateUser(updatedUser) {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index === -1) throw new Error("Usuário não encontrado!");

    users[index] = updatedUser;
    await saveUsers(users);

    // Se for o usuário logado, atualiza o state
    if (user?.id === updatedUser.id) setUser(updatedUser);
  }

  // Deletar usuário
  async function deleteUser(id) {
    const users = await readUsers();
    const filtered = users.filter((u) => u.id !== id);
    await saveUsers(filtered);

    // Se o usuário logado for deletado, desloga
    if (user?.id === id) setUser(null);
  }

  // Buscar todos os usuários (para admin)
  async function getAllUsers() {
    return await readUsers();
  }

  // Carregar estado inicial (opcional, se quiser persistir login)
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(false);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        createUser,
        login,
        logout,
        updateUser,
        deleteUser,
        getAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}