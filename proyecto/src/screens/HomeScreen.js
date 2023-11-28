import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import Event from "../components/Event";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [peliculas, setPeliculas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:7071/peliculas', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('x-access-token'),
          }
        });
        if (response.ok) {
          const result = await response.json();
          setPeliculas(result);
        } else {
          console.error('Error en la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    };
    fetchData();
  }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Next Events</Text>
                {Event(peliculas,{navigation},true)}
                <Button title="More Next Events" color={"black"} onPress={() => navigation.navigate('Next Events')}></Button>                   
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