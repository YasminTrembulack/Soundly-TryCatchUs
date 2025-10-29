import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    titleSoundly: {
        fontFamily: "Caveat_400Regular",
        fontSize: 60,
        fontWeight: "bold",
        color: colors.accent,
        marginBottom: 24,
    },
    title: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 24,
        fontWeight: "bold",
        color: colors.accent,
        marginBottom: 24,
    },
    text: {
        fontFamily: "AnonymousPro_400Regular",
        fontSize: 16,
        color: colors.hellotrope,
        textAlign: "center",
    },
    input: {
        width: "100%",
        fontFamily: "AnonymousPro_400Regular",
        borderWidth: 1,
        borderColor: colors.hellotrope,
        backgroundColor: colors.white,
        padding: 10,
        marginVertical: 6,
        borderRadius: 18,
    },
    button: {
        width: "100%",
        backgroundColor: colors.tekhelet,
        padding: 12,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: colors.white,
        fontFamily: "AnonymousPro_400Regular",
        fontWeight: 24,
        fontSize: 16,
    },
    link: {
        fontFamily: "RobotoCondensed_400Regular",
        color: colors.accent,
        textAlign: "center",
        marginTop: 10,
    },
});