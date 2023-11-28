import React from "react";
import {View, FlatList, TouchableOpacity, Image, Text } from "react-native";

function Event(data,{navigation},horizontal){

  const handleImagePress = (idMovie) => {
      navigation.navigate('DetailStackScreen', {
        screen: 'Detail Event',
        params: { idMovie: idMovie },
      });
  };
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.titulo}
        horizontal={horizontal} // Configura la lista como horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => ( 
          <View style={{ padding: 10 }}>
            <Text>Título: {item.titulo}</Text>
            
            {/*item.idSerie != null && (
              <Text>Serie{console.log('Aquí hay un idSerie')}</Text>
            )*/}
            
            <Text>Fecha: {new Date(item.fecha_lanzamiento).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</Text>
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
    )
}

export default Event;

const styles = {
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
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
};