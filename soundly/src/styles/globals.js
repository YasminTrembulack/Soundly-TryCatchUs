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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.accent,
        marginBottom: 24,
    },
    text: {
        fontSize: 16,
        color: colors.hellotrope,
        textAlign: "center",
    },
    input: {
        width: "100%",
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
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        color: colors.accent,
        textAlign: "center",
        marginTop: 10,
    },
});