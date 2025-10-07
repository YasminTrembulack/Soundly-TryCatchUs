import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native"; // <--- Importe useNavigation
import { View, Text, StyleSheet, ScrollView } from "react-native";

import PontoTuristicoCard from "../components/PontoTuristicoCard"; // <--- Importe o componente

const ListaPontosTuristicos = () => {
  const navigation = useNavigation(); // <--- Hook para acessar a navegação

  const handleGoToDetails = (pontoId, nomePonto, descricaoPonto) => {
    // <--- Navega para a tela 'DetalhesPonto' e passa parâmetros
    navigation.navigate("DetalhesPonto", {
      pontoDetalhes: {
        id: pontoId,
        nome: nomePonto,
        descricao: descricaoPonto,
        detalhesCompletos: descricaoPonto, // se quiser usar o mesmo texto
      },
    });
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      {/* <--- Usando ScrollView */}
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Conheça Curitiba!</Text>
        {/* <--- Título principal */}
        <PontoTuristicoCard
          nome="Jardim Botânico"
          onPress={() =>
            handleGoToDetails(
              "123",
              "Jardim Botânico",
              "Um dos mais famosos cartões-postais da cidade."
            )
          }
        />
        <PontoTuristicoCard
          nome="Ópera de Arame"
          onPress={() =>
            handleGoToDetails(
              "124",
              "Ópera de Arame",
              "Teatro com estrutura tubular e teto transparente, em meio à natureza."
            )
          }
        />
        <PontoTuristicoCard
          nome="Parque Tanguá"
          onPress={() =>
            handleGoToDetails(
              "125",
              "Parque Tanguá",
              "Antiga pedreira transformada em parque com cascata e mirante."
            )
          }
        />
        <PontoTuristicoCard
          nome="Museu Oscar Niemeyer"
          onPress={() =>
            handleGoToDetails(
              "126",
              "Museu Oscar Niemeyer",
              "Conhecido como Museu do Olho, com arte moderna e contemporânea."
            )
          }
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Lista de Pontos Turísticos</Text>

    //   <Button
    //     title="Ver Detalhes do Parque Barigui"
    //     onPress={() => handleGoToDetails(
    //       "123", "Parque Barigui", "Um lindo parque em Curitiba com capivaras."
    //     )}
    //   />
    //   <Button
    //     title="Ver Detalhes do Parque Barigui"
    //     onPress={() => handleGoToDetails(
    //       "123", "Parque Barigui", "Um lindo parque em Curitiba com capivaras."
    //     )}
    //   />

    //   {/* Aqui virá a lista real de pontos turísticos */}
    // </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    // Estilo para o ScrollView
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

export default ListaPontosTuristicos;
