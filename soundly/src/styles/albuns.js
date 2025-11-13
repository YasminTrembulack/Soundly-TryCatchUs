import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        height: 50,
    },
    searchIcon: {
        fontSize: 20,
        color: colors.light,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: colors.text,
        fontSize: 16,
    },
    filtersContainer: {
        marginBottom: 20,
    },
    filtersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.light,
        marginBottom: 10,
    },
    albumCard: {
        backgroundColor: colors.cardBackground,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    albumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.accent,
        marginBottom: 5,
    },
    albumArtist: {
        fontSize: 16,
        color: colors.light,
        marginBottom: 3,
    },
    albumYear: {
        fontSize: 14,
        color: colors.light,
        fontStyle: 'italic',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: colors.light,
        marginTop: 10,
    },
})