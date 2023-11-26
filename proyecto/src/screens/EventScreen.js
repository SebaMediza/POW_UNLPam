import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';


const urlApi = 'http://localhost:7071';
function EventScren() {
  const route = useRoute();
  const { idMovie } = route.params;
  console.log("idPeli: " + idMovie);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);

  const handleComment = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const fetchPeli = async () => {
    const response = await fetch(urlApi + '/peliculas/' + idMovie, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      }
    })
    const res = await response.json();
    setData(res);
  };

  useEffect(() => {
    fetchPeli();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.titulo}</Text>
      <img
        source={data.image}
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontSize: 16, marginTop: 10 }}>{data.descripcion}</Text>
      {/* Render del video: Puedes agregar un componente de video aquí */}

      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>Comentarios</Text>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.descripcion}</Text>}
      />

      <TextInput
        placeholder="Añadir comentario"
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Comentar" onPress={handleComment} />
    </View>
  );
};

export default EventScren;