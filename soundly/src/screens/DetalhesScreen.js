import { useState } from 'react';
import { 
  View, 
  Text, 
  Image,
  ScrollView, 
  TouchableOpacity,  
} from "react-native";

import colors from "../styles/colors";
import styles from "../styles/playlists";


export default function DetalhesScreen({ route, navigation }) {
  const [activeTab, setActiveTab] = useState('Misicas');
  
  // Dados do álbum ATUALIZADOS com imagens e artistas corretos
  const albumData = {
    title: "From Zero",
    artist: "Linkin Park",
    releaseDate: "04/10/2014",
    duration: "3:21",
    coverImage: "https://cdn.prod.website-files.com/66e1e7e2979a571dc056efb6/6736deee0198fd0b2342c6a5_from-zero-lancamento.webp",
    tracks: [
      { 
        id: 1, 
        title: "Starboy", 
        artist: "The Weeknd ft. Daft Punk",
        duration: "3:45", 
        year: "2016",
        image: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452"
      },
      { 
        id: 2, 
        title: "Clocks", 
        artist: "Coldplay",
        duration: "4:20", 
        year: "2002",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Vhmy2Q_Z3bSn7ySSelVFdAxn0bnjt4Ot0Q&s"
      },
      { 
        id: 3, 
        title: "Espresso", 
        artist: "Sabrina Carpenter",
        duration: "3:15", 
        year: "2024",
        image: "https://i1.sndcdn.com/artworks-JmEzUTtysnlJQLLz-xYCFCA-t1080x1080.jpg"
      },
      { 
        id: 4, 
        title: "Soft Universe", 
        artist: "AURORA",
        duration: "3:30", 
        year: "2018",
        image: "https://tiermaker.com/images/chart/chart/aurora---all-songs-1332115/zz1639013812soft-universe-minpng.png"
      },
      { 
        id: 5, 
        title: "BIRDS OF A FEATHER", 
        artist: "Billie Eilish",
        duration: "3:55", 
        year: "2024",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5d2kuOjLrl2aNJJdoQ5PO6UGTpAQ6ZCl2uTpNGIf1LN5vzCXEOU3254viRhAM6v8EtM8&usqp=CAU"
      },
      { 
        id: 6, 
        title: "Baby", 
        artist: "Justin Bieber ft. Ludacris",
        duration: "3:10", 
        year: "2010",
        image: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/ad/Baby_Single.jpg/250px-Baby_Single.jpg"
      }
    ]
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Lancuments':
        return (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: colors.hellotrope, fontFamily: "AnonymousPro_400Regular" }}>
              Conteúdo Lancuments
            </Text>
          </View>
        );
      case 'Madeat':
        return (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: colors.hellotrope, fontFamily: "AnonymousPro_400Regular" }}>
              Conteúdo Madeat
            </Text>
          </View>
        );
      case 'Misicas':
      default:
        return (
          <ScrollView 
            style={styles.tracksList}
            showsVerticalScrollIndicator={false}
          >
            {albumData.tracks.map((track) => (
              <TouchableOpacity 
                key={track.id} 
                style={styles.trackItem}
                onPress={() => {
                  console.log(`Tocando: ${track.title} - ${track.artist}`);
                  // Aqui você pode navegar para DetalhesMusicaScreen depois
                  // navigation.navigate('DetalhesMusica', { trackId: track.id });
                }}
              >
                <Image 
                  source={{ uri: track.image }} 
                  style={styles.trackImage}
                />
                <View style={styles.trackInfo}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackArtist}>{track.artist}</Text>
                  <Text style={styles.trackYear}>{track.year}</Text>
                </View>
                <Text style={styles.trackDuration}>{track.duration}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* ÍCONE FLUTUANTE ↶ ACIMA DO HEADER */}
      <TouchableOpacity 
        style={styles.backIconFloating}
        onPress={() => navigation.navigate('Albuns')}
      >
        <Text style={styles.backIconText}>↶</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DETALHES ALBUM</Text>
        <Text style={styles.appTitle}>SoundLY</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Cabeçalho do Álbum com Imagem */}
        <View style={styles.albumHeader}>
          <Image 
            source={{ uri: albumData.coverImage }} 
            style={styles.coverImage}
          />
          <View style={styles.albumInfo}>
            <Text style={styles.albumTitle}>{albumData.title}</Text>
            <Text style={styles.artist}>{albumData.artist}</Text>
            <Text style={styles.releaseDate}>{albumData.releaseDate}</Text>
            <Text style={styles.duration}>{albumData.duration}</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Lancuments' && styles.activeTab]}
            onPress={() => setActiveTab('Lancuments')}
          >
            <Text style={[styles.tabText, activeTab === 'Lancuments' && styles.activeTabText]}>
              Lancuments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Madeat' && styles.activeTab]}
            onPress={() => setActiveTab('Madeat')}
          >
            <Text style={[styles.tabText, activeTab === 'Madeat' && styles.activeTabText]}>
              Madeat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Misicas' && styles.activeTab]}
            onPress={() => setActiveTab('Misicas')}
          >
            <Text style={[styles.tabText, activeTab === 'Misicas' && styles.activeTabText]}>
              Misicas
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </View>
    </View>
  );
}