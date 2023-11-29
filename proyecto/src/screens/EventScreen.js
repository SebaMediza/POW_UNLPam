import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@env'

function EventScreen() {
  const route = useRoute();
  const { idMovie } = route.params;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);

  const handleComment = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
      console.log("Se comento: ", comment)
    }
  };

  const fetchPeli = async () => {
    const response = await fetch(`${API}/peliculas/${idMovie}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('x-access-token'),
      }
    })
    const res = await response.json();
    setData(res);
  };

  useEffect(() => {
    fetchPeli();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFED8D' }}>
      <View style={{ backgroundColor: '#fbd52c', flex: 1, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{data.titulo}</Text>
        <Image
          source={{ uri: data.imagen }}
          style={{ width: '%40', height: 200, margin: 5 }}
        />
        <Text style={{ fontSize: 16, margin: 5, borderRadius: 5 }}>{data.descripcion}</Text>
        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }}>
          <Text style={{ fontSize: 16, margin: 5, borderRadius: 5, backgroundColor: '#fbd52c', textAlign: 'center' }}>Reproducir</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }}>
        <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Comentarios</Text>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item.descripcion}</Text>}
        />
        <TextInput
          placeholder="Añadir comentario"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{ borderWidth: 1, padding: 10, margin: 10, backgroundColor: '#fbd52c' }}
        />
        <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10, margin: 5 }} onPress={handleComment}>
          <Text style={{ fontSize: 16, margin: 5, borderRadius: 5, textAlign: 'center' }}>Comentar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default EventScreen;


/* 
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Título del Evento</Text>
      <Image
        source={{ uri: 'URL_DE_LA_IMAGEN_PRINCIPAL' }}
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontSize: 16, marginTop: 10 }}>Descripción del Evento</Text>
      
      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Comentarios</Text>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

      <TextInput
        placeholder="Añadir comentario"
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Comentar" onPress={handleComment} />
    </View>
*/