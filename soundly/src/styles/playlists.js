import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
    },
    playlistCard: {
        backgroundColor: colors.cardBackground,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.primary,
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

})