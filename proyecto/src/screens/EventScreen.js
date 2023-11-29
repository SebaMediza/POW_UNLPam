import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';



const urlApi = 'http://localhost:7071';
function EventScren() {
  const route = useRoute();
  const { idMovie } = route.params;
  
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  const [hayComentarios, setHayComentarios] = useState(false)

  const handleComment = () => {
    const idContenido = idMovie;
    const comentario = comment;
    const comm = {idContenido, comentario};
    createComment(comm);
    if(comments){
      setHayComentarios(true);
     // setComments([...comments, { comentario: comment }])
    }
  };
  
  const createComment = async (comm) => {
    await fetch(urlApi + '/newComentario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      },
      body: JSON.stringify(comm)
    }).then((response)=>{
      if(response.ok){
        console.log("se cargo bien");
        setHayComentarios(true);
        verComentarios(idMovie);
      }
    })
  };
  
  const verComentarios = async (idMovie) => {
    const response = await fetch(urlApi + '/verComentarios/' + idMovie, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJibGFzIiwiaWF0IjoxNzAwNjc3NjY4fQ.iUrd1YhX5F0BILCPmNaIFteREZndbmSDpAuuoY5af-Y'
      },
    })
    const res = await response.json();
    if(res.length > 0){
      setHayComentarios(true);
      console.log("id: " + idMovie + " esta en : " +hayComentarios);
    }else{
      setHayComentarios(false);
    }
    setComments(res);
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
    verComentarios(idMovie);
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

      <TextInput
        placeholder="Añadir comentario"
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      /> 
      
      
      <Button title="Comentar" onPress={handleComment} />
      <br></br>
      <View style={styles.line}/>
      {hayComentarios ? (
        
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.comment}>{item.comentario}</Text>
          )}
        />
      ) : (
        <Text style={styles.comment}>No hay comentarios</Text>
      )}

        
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'black', // Puedes ajustar el color según tus preferencias
  },
  comment: {
    padding: 5, 
    fontSize: 16
  }
});
export default EventScren;