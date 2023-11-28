import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BananaTV = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const usuario = { nombre, password };
      const data = await fetch('http://localhost:7071/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      const response = await data.json();
      if (data.status === 200) {
        console.log();
        await AsyncStorage.setItem('x-access-token', response.data.userData.token);
        console.log('token guardado');
        navigation.navigate('HomeTabNavigator');
      }
    } catch (error) {
      console.log('Error en la Solicitud: ', error)
    }
  };

  return (
    <View style={styles.container} >
    <View style={styles.formcontainer}>
      <Image
        scr={'./assets/icon.jpg'}
        width={200}
        height={200}
      />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={(text) => setNombre(text)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.text}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFED8D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formcontainer: {
    width: '90%',
    padding: 16,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 8,
  },
  boton: {
    backgroundColor: '#FBD52C', // Cambia el color de fondo aquí
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#000', // Cambia el color del texto aquí
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BananaTV;