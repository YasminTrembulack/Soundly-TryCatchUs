import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  label: {
    color: colors.text,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: colors.text,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  iconBoxSelected: {
    borderWidth: 2,
    borderColor: colors.accent,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // efeito de sombra no Android
  },

  iconText: {
    fontSize: 22,
  },
});
