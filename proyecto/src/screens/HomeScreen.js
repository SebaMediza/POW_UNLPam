import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Event from "../components/Event";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@env'

function HomeScreen({ navigation }) {

  const [dataNextPelis, setDataNextPelis] = useState([]);
  //const [dataNextSerie, setDataNextSerie] = useState([]);
  const [dataPastPelis, setDataPastPelis] = useState([]);
  //const [dataPastSerie, setDataPastSerie] = useState([]);
  const dataNextEvent = [...dataNextPelis/*, ...dataNextSerie*/];
  const dataPastEvent = [...dataPastPelis/*, ...dataPastSerie*/];


  const fetchAllNextPelis = async () => {
    const response = await fetch(`${API}/proximamentePelicula`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setDataNextPelis(res);
  };

  /*const fetchAllNextSerie = async () => {
    const response = await fetch(`${API}/proximamenteSerie`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setDataNextSerie(res);
  };*/

  const fetchAllPastPelis = async () => {
    const response = await fetch(`${API}/peliculaPasadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setDataPastPelis(res);
  };

  /*const fetchAllPastSerie = async () => {
    const response = await fetch(`${API}/seriePasadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setDataPastSerie(res);
  };*/


  useEffect(() => {
    fetchAllNextPelis();
    //fetchAllNextSerie();
    fetchAllPastPelis();
    //fetchAllPastSerie();
  }, []);

  const eventosProximosOrdenados = dataNextEvent.sort((a, b) => {
    const fechaA = new Date(a.fecha_lanzamiento);
    const fechaB = new Date(b.fecha_lanzamiento);

    if (fechaA.getFullYear() !== fechaB.getFullYear()) {
      return fechaA.getFullYear() - fechaB.getFullYear();
    }

    if (fechaA.getMonth() !== fechaB.getMonth()) {
      return fechaA.getMonth() - fechaB.getMonth();
    }

    return fechaA.getDate() - fechaB.getDate();
  });

  const eventosPasadosOrdenados = dataPastEvent.sort((a, b) => {
    const fechaA = new Date(a.date);
    const fechaB = new Date(b.date);

    if (fechaA.getFullYear() !== fechaB.getFullYear()) {
      return fechaA.getFullYear() - fechaB.getFullYear();
    }

    if (fechaA.getMonth() !== fechaB.getMonth()) {
      return fechaA.getMonth() - fechaB.getMonth();
    }

    return fechaA.getDate() - fechaB.getDate();
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proximamente</Text>
        {Event(eventosProximosOrdenados, { navigation }, true, 5)}
        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }} onPress={() => navigation.navigate('Proximamente')}>
          <Text style={{ fontSize: 16, margin: 5, borderRadius: 5, textAlign: 'center' }}>Mas a Estrenar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estrenos</Text>
        {Event(eventosPasadosOrdenados, { navigation }, true, 5)}
        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }} onPress={() => navigation.navigate('Estrenos')}>
          <Text style={{ fontSize: 16, margin: 5, borderRadius: 5, textAlign: 'center' }}>Mas Estrenos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFED8D'
  },
  section: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: '#fbd52c',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;import React, { useEffect, useState } from "react";
import { TouchableOpacity, Button, Text, View, StyleSheet, FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

const urlApi = 'http://localhost:7071'
function HomeScreen() {
  const navigation = useNavigation();
 
  const [dataNextPelis, setDataNextPelis] = useState([]);
  const [dataNextSerie, setDataNextSerie] = useState([]);
  const [dataPastPelis, setDataPastPelis] = useState([]);
  const [dataPastSerie, setDataPastSerie] = useState([]);
  const dataNextEvent = [...dataNextPelis, ...dataNextSerie];
  const dataPastEvent = [...dataPastPelis, ...dataPastSerie];
  
  

  const fetchAllNextPelis = async () => {
    const response = await fetch(urlApi + '/proximamentePelicula', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataNextPelis(res);
  };

  const fetchAllNextSerie = async () => {
    const response = await fetch(urlApi + '/proximamenteSerie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataNextSerie(res);
  };

  const fetchAllPastPelis = async () => {
    const response = await fetch(urlApi + '/peliculaPasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataPastPelis(res);
  };

  const fetchAllPastSerie = async () => {
    const response = await fetch(urlApi + '/seriePasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataPastSerie(res);
  };


  useEffect(() => {
    fetchAllNextPelis();
    fetchAllNextSerie();
    fetchAllPastPelis();
    fetchAllPastSerie();
  }, []);



  const handleImagePress = (idMovie) => {
    navigation.navigate('DetailStackScreen', {
      screen: 'Detail Event',
      params: { idMovie: idMovie },
    });
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Events</Text>
        <FlatList
          data={dataNextEvent }
          keyExtractor={(item) => item.titulo} // Asegúrate de convertir a cadena o número si es necesario
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={() => handleImagePress(item.idMovie)}
                style={{ padding: 10 }}
              >
                <Image
                  style={styles.img}
                  source={{ uri: item.imagen }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="More Next Events" color={"black"} onPress={() => navigation.navigate('Next Events')}></Button>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Events</Text>
        <FlatList
          data={dataPastEvent}
          keyExtractor={(item) => item.id}
          horizontal={true} // Configura la lista como horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={() => handleImagePress(item.idMovie)}
                style={{ padding: 10 }}
              >
                <Image
                  style={styles.img}
                  source={{ uri: item.imagen }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="More Past Events" color={"black"} onPress={() => navigation.navigate('Past Events')}></Button>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  img: {
    width: 170,
    height: 170
  }
});

export default HomeScreen;