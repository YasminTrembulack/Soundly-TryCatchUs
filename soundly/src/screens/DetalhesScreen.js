/**
 * /src/screens/DetalhesScreen.js
 * Tela de detalhes do álbum - Com ícone flutuante discreto ↶
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import colors from "../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ÍCONE FLUTUANTE ACIMA DO HEADER
  backIconFloating: {
    position: 'absolute',
    top: 40, // Acima do header
    left: 20,
    zIndex: 1000, // Fica por cima de tudo
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconText: {
    fontSize: 28, // Tamanho bom para visualização
    color: '#C77DFF', // Cor que você escolheu - hellotrope
    fontWeight: 'bold',
  },
  header: {
    paddingTop: 60, // Espaço para o ícone flutuante
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: colors.russianViolet,
  },
  headerTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 24,
    color: colors.hellotrope,
    marginBottom: 8,
    textAlign: 'center',
  },
  appTitle: {
    fontFamily: "Caveat_400Regular",
    fontSize: 32,
    color: colors.mauve,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  
  // Informações do Álbum
  albumInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 28,
    color: colors.mauve,
    marginBottom: 8,
  },
  artist: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 20,
    color: colors.hellotrope,
    marginBottom: 6,
  },
  releaseDate: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 16,
    color: colors.hellotrope,
    marginBottom: 4,
  },
  duration: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 18,
    color: colors.tekhelet,
  },
  
  // Abas (Lancuments, Madeat, Misicas)
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.frenchViolet,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 16,
    color: colors.hellotrope,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.mauve,
  },
  activeTabText: {
    color: colors.mauve,
    fontFamily: "RobotoCondensed_700Bold",
  },
  
  // Lista de Músicas
  tracksList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.persianIndigo,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.frenchViolet,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 16,
    color: colors.mauve,
    marginBottom: 4,
  },
  trackYear: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 12,
    color: colors.hellotrope,
  },
  trackDuration: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 14,
    color: colors.tekhelet,
  },
});

export default function DetalhesScreen({ route, navigation }) {
  const [activeTab, setActiveTab] = useState('Misicas');
  
  const albumData = {
    title: "From Zero",
    artist: "Linkin Park",
    releaseDate: "04/10/2014",
    duration: "3:21",
    tracks: [
      { id: 1, title: "Stanboy", duration: "3:45", year: "The world 2018" },
      { id: 2, title: "Clocks", duration: "4:20", year: "30.09.1997-2002" },
      { id: 3, title: "Espresso", duration: "3:15", year: "Start to Complete - 2004" },
      { id: 4, title: "Soft Universe", duration: "3:30", year: "AUGUST 2018" },
      { id: 5, title: "BIRDS OF A FEATHER", duration: "3:55", year: "BILLIE ELLEN 2009" },
      { id: 6, title: "Baby", duration: "3:10", year: "JACKET RIGHT 2018" }
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Lancuments':
        return (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: colors.hellotrope, fontFamily: "AnonymousPro_400Regular" }}>
              Conteúdo Lancuments
            </Text>
          </View>
        );
      case 'Madeat':
        return (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: colors.hellotrope, fontFamily: "AnonymousPro_400Regular" }}>
              Conteúdo Madeat
            </Text>
          </View>
        );
      case 'Misicas':
      default:
        return (
          <ScrollView 
            style={styles.tracksList}
            showsVerticalScrollIndicator={false}
          >
            {albumData.tracks.map((track) => (
              <TouchableOpacity 
                key={track.id} 
                style={styles.trackItem}
                onPress={() => console.log(`Tocando: ${track.title}`)}
              >
                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackYear}>{track.year}</Text>
                </View>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* ÍCONE FLUTUANTE ↶ ACIMA DO HEADER */}
      <TouchableOpacity 
        style={styles.backIconFloating}
        onPress={() => navigation.navigate('Albuns')}
      >
        <Text style={styles.backIconText}>↶</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DETALHES ALBUM</Text>
        <Text style={styles.appTitle}>SoundLY</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle}>{albumData.title}</Text>
          <Text style={styles.artist}>{albumData.artist}</Text>
          <Text style={styles.releaseDate}>{albumData.releaseDate}</Text>
          <Text style={styles.duration}>{albumData.duration}</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Lancuments' && styles.activeTab]}
            onPress={() => setActiveTab('Lancuments')}
          >
            <Text style={[styles.tabText, activeTab === 'Lancuments' && styles.activeTabText]}>
              Lancuments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Madeat' && styles.activeTab]}
            onPress={() => setActiveTab('Madeat')}
          >
            <Text style={[styles.tabText, activeTab === 'Madeat' && styles.activeTabText]}>
              Madeat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Misicas' && styles.activeTab]}
            onPress={() => setActiveTab('Misicas')}
          >
            <Text style={[styles.tabText, activeTab === 'Misicas' && styles.activeTabText]}>
              Misicas
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </View>
    </View>
  );
}