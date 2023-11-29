import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

function EventScreen() {
  const route = useRoute();
  if (!route || !route.params || !route.params.idMovie) {
    // Manejar el caso en el que idMovie no está definido
    return <Text>Error: idMovie no está definido</Text>;
  }

  const { idMovie } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    // Función asincrónica para realizar la solicitud
    const fetchData = async () => {
      try {
        // Hacer la solicitud usando fetch
        const response = await fetch(`http://localhost:7071/peliculas/${idMovie}`, {
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
          setPelicula(result);
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
  { console.log(pelicula); }

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