import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native"; // <--- Importe ScrollView
import PontoTuristicoCard from "./components/PontoTuristicoCard"; // <--- Importe o componente

export default function App() {
  return (
    <ScrollView style={styles.scrollViewContainer}>{/* <--- Usando ScrollView */}
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Conheça Curitiba!</Text>{/* <--- Título principal */}
        <PontoTuristicoCard
          nome="Jardim Botânico"
          descricao="Um dos mais famosos cartões-postais da cidade."
        />
        <PontoTuristicoCard
          nome="Ópera de Arame"
          descricao="Teatro com estrutura tubular e teto transparente, em meio à natureza."
        />
        <PontoTuristicoCard
          nome="Parque Tanguá"
          descricao="Antiga pedreira transformada em parque com cascata e mirante."
        />
        <PontoTuristicoCard
          nome="Museu Oscar Niemeyer"
          descricao="Conhecido como Museu do Olho, com arte moderna e contemporânea."
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: { // Estilo para o ScrollView
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  container: {
    // Remova 'justifyContent: center' e 'alignItems: center'
    // para permitir que os cards se posicionem naturalmente.
    flex: 1,
    backgroundColor: "#f5f5f5", // Fundo claro para o app
    paddingTop: 50, // Espaço para a barra de status no topo
  },

  mainTitle: {
    // Novo estilo para o título principal
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});
