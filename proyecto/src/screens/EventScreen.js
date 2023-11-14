import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import Header from '../components/Header';

const EventScreen = () => {
  return (
    <View style={styles.container}>
      {/*<Header title="Detalles del Evento" />*/}
      <View style={styles.content}>
        <Text>Evento en Construcción</Text>
        {/* Agrega más detalles del evento aquí */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});

export default EventScreen;