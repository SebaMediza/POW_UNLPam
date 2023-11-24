import { Button, Text, View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';

function HomeScreen({ navigation }) {
  const [peliculas, setPeliculas] = useState(null);

  useEffect(() => {
    // Función asincrónica para realizar la solicitud
    const fetchData = async () => {
      try {
        // Hacer la solicitud usando fetch
        const response = await fetch('http://localhost:7071/peliculas', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
          }
        });

        // Verificar si la respuesta es exitosa (código de estado 200)
        if (response.ok) {
          // Parsear la respuesta como JSON
          const result = await response.json();

          // Actualizar el estado con los datos recibidos
          setPeliculas(result);
        } else {
          // Manejar errores en la respuesta
          console.error('Error en la solicitud:', response.statusText);
        }
      } catch (error) {
        // Manejar errores de red u otros errores
        console.error('Error en la solicitud:', error.message);
      }
    };

    // Llamar a la función de solicitud cuando el componente se monta
    fetchData();
  }, []); // La dependencia vacía asegura que useEffect se ejecute solo una vez al montar el componente
  {console.log(peliculas)}

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Next Events</Text>
                {Event(data,{navigation},true)}
                <Button title="More Next Events" color={"black"} onPress={() => navigation.navigate('Next Events')}></Button>                   
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Events</Text>
                {Event(data,{navigation},true)}
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