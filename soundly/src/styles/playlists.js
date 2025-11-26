import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    // marginBottom: 15,
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 48,
    fontWeight: "bold",
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    // marginBottom: 20,
  },
  playlistCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playlistIcon: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistContent: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 5,
  },
  playlistInfo: {
    fontSize: 14,
    color: colors.light,
  },
  playlistDate: {
    fontSize: 12,
    color: colors.light,
    fontStyle: 'italic',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: colors.light,
  },
  activeNav: {
    color: colors.accent,
  }
});
