import { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useContext(UserContext);

  // 📊 DADOS FICTÍCIOS para estatísticas (enquanto não tem na API)
  const estatisticas = {
    playlists: 8,
    musicas: 156,
    seguidores: 245
  };

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👤 Meu Perfil</Text>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView style={styles.content}>
        
        {/* SEÇÃO: INFORMAÇÕES DO USUÁRIO */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          
          <Text style={styles.userName}>{user?.full_name || "Usuário"}</Text>
          <Text style={styles.userEmail}>{user?.email || "email@exemplo.com"}</Text>
          <Text style={styles.userRole}>{user?.role || "Usuário"}</Text>
        </View>

        {/* SEÇÃO: ESTATÍSTICAS */}
        <Text style={styles.sectionTitle}>📊 Minhas Estatísticas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estatisticas.playlists}</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estatisticas.musicas}</Text>
            <Text style={styles.statLabel}>Músicas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{estatisticas.seguidores}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
        </View>

        {/* SEÇÃO: AÇÕES */}
        <Text style={styles.sectionTitle}>⚙️ Ações</Text>
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Text style={styles.actionEmoji}>✏️</Text>
            <Text style={styles.actionText}>Editar Perfil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Text style={styles.actionEmoji}>🔧</Text>
            <Text style={styles.actionText}>Configurações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]} 
            activeOpacity={0.7}
            onPress={() => logout()}
          >
            <Text style={styles.actionEmoji}>🚪</Text>
            <Text style={[styles.actionText, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

// 🎨 ESTILOS - Mesmo tema das outras telas
const styles = StyleSheet.create({
  // FUNDO PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C', // Preto puro
  },
  
  // CABEÇALHO
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#1A1A1A', // Cinza escuro
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6', // Azul principal
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8FD9FF', // Azul claro
  },

  // CONTEÚDO
  content: {
    flex: 1,
    padding: 16,
  },

  // SEÇÃO DO PERFIL
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3B82F6', // Azul
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8FD9FF', // Azul claro
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // SEÇÃO
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BB86FC', // Roxo
    marginBottom: 15,
  },

  // ESTATÍSTICAS
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#3B82F6', // Azul
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // AÇÕES
  actionsSection: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3B82F6', // Azul
  },
  logoutButton: {
    borderColor: '#FF6B6B', // Vermelho para logout
  },
  actionEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  logoutText: {
    color: '#FF6B6B', // Vermelho para logout
  },
});