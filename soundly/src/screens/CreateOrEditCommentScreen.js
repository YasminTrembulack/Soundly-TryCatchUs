import { useFocusEffect } from "@react-navigation/native";
import { useState, useContext, useCallback } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import globals from "../styles/globals";
import styles from "../styles/createplaylist"; // reutiliza o estilo base
import { CommentContext } from "../context/CommentContext";
import { UserContext } from "../context/UserContext";

export default function CreateOrEditCommentScreen({ route, navigation }) {
  const [text, setText] = useState("");
  const [existingComment, setExistingComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const { user } = useContext(UserContext);
  const { addComment, updateComment, deleteComment } =
    useContext(CommentContext);

  useFocusEffect(
    useCallback(() => {
      const { targetId, existingComment } = route.params ?? {};

      setText(existingComment?.text ?? "");
      setExistingComment(existingComment ?? null);
      setIsEditing(!!existingComment);
      setTargetId(targetId ?? null);

      console.log("📌 [reload] Comentário carregado:", existingComment);

      console.log(existingComment);
      console.log(!!existingComment);

      return () => {}; // cleanup opcional
    }, [route.params])
  );

  async function handleSave() {
    if (!text.trim()) return;

    if (isEditing) {
      await updateComment(existingComment.id, text);
    } else {
      // userId, username, text, targetId
      await addComment(user.id, user.username, text, targetId);
    }

    navigation.goBack();
  }

  async function handleDelete() {
    await deleteComment(existingComment.id);
    navigation.goBack();
  }

  return (
    <View style={globals.container}>
      <View>
        <View style={globals.header}>
          <Text style={globals.title}>SoundLY</Text>
          <Text style={globals.screenTitle}>
            {isEditing ? "Editar Comentário" : "Novo Comentário"}
          </Text>
        </View>

        {/* CAMPO DO COMENTÁRIO */}
        <Text style={globals.label}>Comentário</Text>

        <TextInput
          style={[styles.input, { height: 120, textAlignVertical: "top" }]}
          placeholder="Digite seu comentário..."
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* BOTÕES */}
        <View style={{ marginTop: 20 }}>
          {/* 🔵 MODO EDIÇÃO */}
          {isEditing ? (
            existingComment?.userId === user.id ? (
              <>
                {/* Salvar alterações */}
                <TouchableOpacity style={globals.button} onPress={handleSave}>
                  <Text style={globals.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>

                {/* Deletar */}
                <TouchableOpacity
                  style={[globals.button, { marginTop: 10 }]}
                  onPress={handleDelete}
                >
                  <Text style={globals.buttonText}>Deletar Comentário</Text>
                </TouchableOpacity>
              </>
            ) : (
              // 🔴 Comentário não é do usuário → não mostra salvar/deletar
              <Text style={{ color: "#aaa", marginBottom: 10 }}>
                Você não pode editar este comentário.
              </Text>
            )
          ) : (
            /* 🟢 MODO CRIAÇÃO */
            <TouchableOpacity style={globals.button} onPress={handleSave}>
              <Text style={globals.buttonText}>Enviar Comentário</Text>
            </TouchableOpacity>
          )}

          {/* Botão Cancelar */}
          <TouchableOpacity
            style={[globals.secundaryButton, { marginTop: 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={globals.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
