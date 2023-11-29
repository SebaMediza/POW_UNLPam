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

export default HomeScreen;