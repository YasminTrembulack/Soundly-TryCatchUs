import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    color: colors.light,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.light,
    marginBottom: 8,
  },
  albumsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  albumCard: {
    width: "48%",
    height: 170,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primary,
    position: "relative",
  },
  albumImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 1, 16, 0.4)",
  },
  albumInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.accent,
    marginBottom: 3,
  },
  albumArtist: {
    fontSize: 11,
    color: colors.light,
    marginBottom: 2,
  },
  albumYear: {
    fontSize: 9,
    color: colors.light,
    fontStyle: "italic",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.light,
    marginTop: 10,
  },

});