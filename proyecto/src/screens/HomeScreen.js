import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, ScrollView} from "react-native";
import Event from "../components/Event";

const urlApi = 'http://192.168.1.38:7071'

function HomeScreen ({navigation}) {

  const [dataNextPelis, setDataNextPelis] = useState([]);
  //const [dataNextSerie, setDataNextSerie] = useState([]);
  const [dataPastPelis, setDataPastPelis] = useState([]);
  //const [dataPastSerie, setDataPastSerie] = useState([]);
  const dataNextEvent = [...dataNextPelis/*, ...dataNextSerie*/];
  const dataPastEvent = [...dataPastPelis/*, ...dataPastSerie*/];
  console.log("todos los pasados: "+ dataPastEvent);
  

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

  /*const fetchAllNextSerie = async () => {
    const response = await fetch(urlApi + '/proximamenteSerie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataNextSerie(res);
  };*/

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

  /*const fetchAllPastSerie = async () => {
    const response = await fetch(urlApi + '/seriePasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
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


  return (
      <ScrollView style={styles.container}>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Next Events</Text>
              {Event(dataNextEvent,{navigation},true,5)}
              <Button title="More Next Events" color={"black"} onPress={() => navigation.navigate('Next Events')}></Button>                   
          </View>
          <View style={styles.section}>
              <Text style={styles.sectionTitle}>Past Events</Text>
              {Event(dataPastEvent,{navigation},true,5)}
              <Button title="More Past Events" color={"black"} onPress={() => navigation.navigate('Past Events')}></Button>
          </View>
      </ScrollView>
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
});

export default HomeScreen;