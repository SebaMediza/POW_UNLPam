import React, { useEffect, useState } from "react";
import { View } from 'react-native';
import Event from "../components/Event";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@env'

function PastEventsScreen({ navigation }) {
  const [dataPelis, setDataPelis] = useState([]);
  //const [dataSerie, setDataSerie] = useState([]);
  const dataEvent = [...dataPelis/*, ...dataSerie*/];

  const fetchAllPelis = async () => {
    const response = await fetch(`${API}/peliculaPasadas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setDataPelis(res);
  };

  /*  const fetchAllSerie = async () => {
      const response = await fetch(`${API}/proximamenteSerie`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('x-access-token'),
        }
      })
      const res = await response.json();
      setDataSerie(res);
    };
  */
  useEffect(() => {
    fetchAllPelis();
    //  fetchAllSerie();

  }, []);


  // Ordenar los eventos del más viejo al más nuevo por año, mes y día
  const eventosOrdenados = dataEvent.sort((a, b) => {
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

  return (
    <View style={{backgroundColor: '#ffed8d', flex: 1}}>
      {Event(eventosOrdenados, { navigation }, false)}
    </View>
  );
};

export default PastEventsScreen;import React, {useState, useEffect} from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';


const urlApi = 'http://localhost:7071'
function PastEventsScreen({navigation}){

  const [dataPelis, setDataPelis] = useState([]);
  const [dataSerie, setDataSerie] = useState([]);
  const dataEvent = [...dataPelis, ...dataSerie];
  
  const fetchAllPelis = async () => {
    const response = await fetch(urlApi + '/peliculaPasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataPelis(res);
  };

  const fetchAllSerie = async () => {
    const response = await fetch(urlApi + '/seriePasadas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setDataSerie(res);
  };

  useEffect(() => {
    fetchAllPelis();
    fetchAllSerie();
    
  }, []);

  // Ordenar los eventos del más viejo al más nuevo por año, mes y día
  const eventosOrdenados = dataEvent.sort((a, b) => {
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

  // Separar los eventos por meses
  const eventosPorMes = eventosOrdenados.reduce((acc, evento) => {
    const mes = new Date(evento.date).toLocaleString('default', { month: 'long' });
    acc[mes] = acc[mes] || [];
    acc[mes].push(evento);
    return acc;
  }, {});

  return (
    <View>
      {/*<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Próximos Eventos</Text>*/}

      <FlatList
        data={Object.entries(eventosPorMes)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
          
            <FlatList
              data={item[1]}
              keyExtractor={(evento) => evento.titulo}
              renderItem={({ item: evento }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailStackScreen', { eventoId: evento.id })}
                  style={{ marginBottom: 10 }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{evento.titulo}</Text>
                  <Text>{evento.fecha_lanzamiento}</Text>
                  <Text>{evento.descripcion}</Text>
                 
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PastEventsScreen;


/*import React from "react";
import {SafeAreaView, VirtualizedList, View, StyleSheet, Text, StatusBar, Button} from 'react-native';

  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 5;
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );



function PastEventsScreen ({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                initialNumToRender={4}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                showsVerticalScrollIndicator={false}
            />
            <Button
                onPress={() => {
                    navigation.navigate("Home");
                }}
                title="More"
                //color="#841584"
                accessibilityLabel="More Videos"
                style={{
                    width: 60,  
                    height: 60,   
                    borderRadius: 30,            
                    backgroundColor: '#ee6e73',                                    
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,                     
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    item: {
      backgroundColor: 'grey',
      height: 150,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
});

*/