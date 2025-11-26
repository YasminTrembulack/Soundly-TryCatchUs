import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../styles/albunsdetails";

export default function Tabs({ type, activeTab, setActiveTab }) {
  return (
    <View style={styles.tabsContainer}>
      {(type === "album" || type === "playlist") && (
        <TouchableOpacity
          style={[styles.tab, activeTab === "Músicas" && styles.activeTab]}
          onPress={() => setActiveTab("Músicas")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Músicas" && styles.activeTabText,
            ]}
          >
            Músicas
          </Text>
        </TouchableOpacity>
      )}

      {type === "track" || type === "album" && (
        <TouchableOpacity
          style={[styles.tab, activeTab === "Ações" && styles.activeTab]}
          onPress={() => setActiveTab("Ações")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Ações" && styles.activeTabText,
            ]}
          >
            Ações
          </Text>
        </TouchableOpacity>
      )}
      {(type === "album" || type === "track") && (
        <TouchableOpacity
          style={[styles.tab, activeTab === "Comentários" && styles.activeTab]}
          onPress={() => setActiveTab("Comentários")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Comentários" && styles.activeTabText,
            ]}
          >
            Comentários
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
