import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const CommentContext = createContext();

const COMMENTS_KEY = "@Soundly:comments";

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // ==========================
  // 🔹 Ler todos os comentários
  // ==========================
  async function readComments() {
    const data = await AsyncStorage.getItem(COMMENTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  // ==========================
  // 🔹 Salvar comentários
  // ==========================
  async function saveComments(data) {
    await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(data));
    setComments(data);
  }

  // ==========================
  // 🔹 Criar comentário
  // ==========================
  async function addComment( userId, username, text, targetId ) {
    const stored = await readComments();

    const newComment = {
      id: Date.now().toString(), // id único
      userId,
      username,
      text,
      targetId,   // id do álbum ou música
      created_at: new Date().toISOString(),
    };
    console.log("newComment");
    console.log(newComment);
    

    const updated = [...stored, newComment];
    await saveComments(updated);

    return newComment;
  }

  // ==========================
  // 🔹 Buscar comentários por álbum/música
  // ==========================
  async function getCommentsByTarget(targetId) {
    const stored = await readComments();
    return stored.filter((c) => c.targetId === targetId);
  }

  // ==========================
  // 🔹 Buscar comentários por usuário
  // ==========================
  async function getCommentsByUser(userId) {
    const stored = await readComments();
    return stored.filter((c) => c.userId === userId);
  }

  // ==========================
  // 🔹 Atualizar comentário
  // ==========================
  async function updateComment(commentId, newText) {
    const stored = await readComments();
    const index = stored.findIndex((c) => c.id === commentId);
    if (index === -1) throw new Error("Comentário não encontrado!");

    stored[index].text = newText;
    stored[index].updated_at = new Date().toISOString();

    await saveComments(stored);
  }

  // ==========================
  // 🔹 Remover comentário
  // ==========================
  async function deleteComment(commentId) {
    const stored = await readComments();
    const newList = stored.filter((c) => c.id !== commentId);
    await saveComments(newList);
  }

  // ==========================
  // 🔹 Inicialização
  // ==========================
  useEffect(() => {
    const load = async () => {
      const data = await readComments();
      setComments(data);
      setLoadingComments(false);
    };
    load();
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loadingComments,
        addComment,
        updateComment,
        deleteComment,
        getCommentsByUser,
        getCommentsByTarget,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
