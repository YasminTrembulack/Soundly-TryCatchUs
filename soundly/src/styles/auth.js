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
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: colors.light,
        fontWeight: '600'
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
        color: colors.text
    },
    button: {
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    buttonText: {
        fontFamily: "AnonymousPro_400Regular",
        color: colors.text,
        fontSize: 18
    },
    authContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    authText: {
        color: colors.light,
        fontSize: 16,
    },
    link: {
        fontFamily: "RobotoCondensed_400Regular",
        color: colors.accent,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    }
});