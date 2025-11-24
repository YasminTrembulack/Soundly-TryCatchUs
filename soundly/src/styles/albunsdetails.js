import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  backIconFloating: {
    position: 'absolute',
    top: 40, // Acima do header
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
    zIndex: 9999, // no web precisa ser muito alto
    elevation: 20, // android
    pointerEvents: 'auto',
  },
  backIconText: {
    fontSize: 28,
    color: '#C77DFF',
    fontWeight: 'bold',
  },
  header: {
    paddingTop: 60, // Espaço para o ícone flutuante
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: colors.dark,
  },
  headerTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 24,
    color: colors.light,
    marginBottom: 8,
    textAlign: 'center',
  },
  appTitle: {
    fontFamily: "Caveat_400Regular",
    fontSize: 32,
    color: colors.accent,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  
  // Informações do Álbum
  albumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 20,
  },
  albumInfo: {
    flex: 1,
  },
  albumTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 24,
    color: colors.accent,
    marginBottom: 8,
  },
  artist: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 18,
    color: colors.light,
    marginBottom: 6,
  },
  releaseDate: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 14,
    color: colors.light,
    marginBottom: 4,
  },
  duration: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 16,
    color: colors.secondary,
  },
  
  // Abas (Lançamentos, Madeat, Músicas)
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: "RobotoCondensed_400Regular",
    fontSize: 16,
    color: colors.light,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  activeTabText: {
    color: colors.accent,
    fontFamily: "RobotoCondensed_700Bold",
  },
  
  // Lista de Músicas COM IMAGENS
  tracksList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.persian,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 16,
    color: colors.accent,
    marginBottom: 4,
  },
  trackArtist: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 12,
    color: colors.light,
    marginBottom: 2,
  },
  trackYear: {
    fontFamily: "AnonymousPro_400Regular",
    fontSize: 11,
    color: colors.light,
    fontStyle: 'italic',
  },
  trackDuration: {
    fontFamily: "RobotoCondensed_700Bold",
    fontSize: 14,
    color: colors.secondary,
    marginLeft: 10,
  },
});