import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, FlatList } from 'react-native';

function EventScreen (){
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Título del Evento</Text>
      <Image
        source={{ uri: 'URL_DE_LA_IMAGEN_PRINCIPAL' }}
        style={{ width: '100%', height: 200 }}
      />
      <Text style={{ fontSize: 16, marginTop: 10 }}>Descripción del Evento</Text>
      {/* Render del video: Puedes agregar un componente de video aquí */}
      
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
  );
};

export default EventScreen;