import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const urlApi = 'http://192.168.1.13:7071'

function RegisterScreen ({navigation}) {
    const [nombre, setNombre] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [tipoPlan, setTipoPlan] = useState(1); // Establece el valor inicial según tu lógica
    const [nroTarjeta, setNroTarjeta] = useState('');
    const [vencimiento, setVencimiento] = useState('');
    const [ccv, setCcv] = useState('');
  
    // Mapeo de nombres de planes a valores numéricos
    const tiposDePlan = [
        { label: 'Bassic', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'Premium', value: 3 },
    ];

    const handleRegistro = () => {
      // Aquí deberías realizar la llamada a la API para registrar al usuario
      // Puedes usar fetch u otras bibliotecas como axios para hacer la solicitud HTTP
      const data = {
        nombre,
        mail,
        password,
        tipoPlan,
        nroTarjeta,
        vencimiento,
        ccv,
      };
  
      // Ejemplo con fetch
      fetch(urlApi + '/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(result => {
          // Manejar la respuesta de la API, podrías redirigir al usuario o mostrar un mensaje de éxito
          console.log('Registro exitoso:', result);
          navigation.navigate('LoginScreen');
        })
        .catch(error => {
          // Manejar errores de la API
          console.error('Error en el registro:', error);
        });
    };
  
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        
        <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa tu nombre"
        />
  
        <Text>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={mail}
          onChangeText={setMail}
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
        />
  
        <Text>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Ingresa tu contraseña"
          secureTextEntry
        />
  
        <Text>Tipo de plan:</Text>
        <Picker
            style={styles.input}
            selectedValue={tipoPlan}
            onValueChange={(itemValue) => setTipoPlan(itemValue)}
        >
            {tiposDePlan.map((tipo, index) => (
                <Picker.Item key={index} label={tipo.label} value={tipo.value} />
            ))}
        </Picker>

        <Text>Número de tarjeta:</Text>
        <TextInput
          style={styles.input}
          value={nroTarjeta}
          onChangeText={setNroTarjeta}
          placeholder="Ingresa el número de tu tarjeta"
          keyboardType="numeric"
        />
  
        <Text>Vencimiento (mes/año):</Text>
        <TextInput
          style={styles.input}
          value={vencimiento}
          onChangeText={setVencimiento}
          placeholder="Ingresa la fecha de vencimiento"
        />
  
        <Text>CCV:</Text>
        <TextInput
          style={styles.input}
          value={ccv}
          onChangeText={setCcv}
          placeholder="Ingresa el CCV"
          keyboardType="numeric"
        />
  
        <Button title="Registrarse" onPress={handleRegistro} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
  });
  

export default RegisterScreen;