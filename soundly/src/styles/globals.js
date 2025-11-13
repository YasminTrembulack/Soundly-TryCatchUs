import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    soundly: {
        fontFamily: "Caveat_400Regular",
        fontSize: 60,
        fontWeight: "bold",
        color: colors.accent,
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontFamily: "Caveat_400Regular",
        fontSize: 48,
        fontWeight: "bold",
        color: colors.accent,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: colors.text,
    },
    screenTitle: {
        fontFamily: "RobotoCondensed_400Regular",
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 30,
    },
    text: {
        fontFamily: "AnonymousPro_400Regular",
        fontSize: 16,
        color: colors.light,
        textAlign: "center",
    },
    input: {
        width: "100%",
        fontFamily: "AnonymousPro_400Regular",
        borderWidth: 1,
        borderColor: colors.light,
        backgroundColor: colors.inputBackground,
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
        color: colors.text,
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
        color: colors.light,
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