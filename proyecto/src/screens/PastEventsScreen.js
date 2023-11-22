import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const eventosData = [
  // Aquí deberías tener datos de tus eventos con al menos las propiedades: título, descripción, imagen, fecha, etc.
  // Ejemplo: { id: 1, title: 'Evento 1', description: 'Descripción del evento 1', date: '2023-12-01', ... }
  { id: 1, title: 'Evento 1', description: 'Descripción del evento 1', date: '2023-12-01'},
  { id: 2, title: 'Evento 2', description: 'Descripción del evento 2', date: '2024-01-01'},
  { id: 3, title: 'Evento 3', description: 'Descripción del evento 3', date: '2024-02-01'},
  { id: 4, title: 'Evento 4', description: 'Descripción del evento 4', date: '2024-03-01'},
  { id: 5, title: 'Evento 5', description: 'Descripción del evento 5', date: '2024-04-01'},
  { id: 6, title: 'Evento 6', description: 'Descripción del evento 6', date: '2024-05-01'},
  { id: 7, title: 'Evento 7', description: 'Descripción del evento 7', date: '2024-04-02'}
];



function PastEventsScreen({navigation}){
  // Ordenar los eventos del más viejo al más nuevo por año, mes y día
  const eventosOrdenados = eventosData.sort((a, b) => {
    const fechaA = new Date(a.date);
    const fechaB = new Date(b.date);

    if (fechaA.getFullYear() !== fechaB.getFullYear()) {
      return fechaA.getFullYear() - fechaB.getFullYear();
    }

    if (fechaA.getMonth() !== fechaB.getMonth()) {
      return fechaA.getMonth() - fechaB.getMonth();
    }

    return fechaA.getDate() - fechaB.getDate();
  });

  // Separar los eventos por meses
  const eventosPorMes = eventosOrdenados.reduce((acc, evento) => {
    const mes = new Date(evento.date).toLocaleString('default', { month: 'long' });
    acc[mes] = acc[mes] || [];
    acc[mes].push(evento);
    return acc;
  }, {});

  return (
    <View>
      {/*<Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Próximos Eventos</Text>*/}

      <FlatList
        data={Object.entries(eventosPorMes)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{item[0]}</Text>
            <FlatList
              data={item[1]}
              keyExtractor={(evento) => evento.id.toString()}
              renderItem={({ item: evento }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailStackScreen', { eventoId: evento.id })}
                  style={{ marginBottom: 10 }}
                >
                  <Text>{evento.title+"  "+evento.date}</Text>
                  <Text>{evento.description}</Text>
                  {/* Puedes mostrar más detalles del evento aquí, como la fecha o la descripción */}
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PastEventsScreen;


/*import React from "react";
import {SafeAreaView, VirtualizedList, View, StyleSheet, Text, StatusBar, Button} from 'react-native';

  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });
  
  const getItemCount = _data => 5;
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );



function PastEventsScreen ({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                initialNumToRender={4}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                showsVerticalScrollIndicator={false}
            />
            <Button
                onPress={() => {
                    navigation.navigate("Home");
                }}
                title="More"
                //color="#841584"
                accessibilityLabel="More Videos"
                style={{
                    width: 60,  
                    height: 60,   
                    borderRadius: 30,            
                    backgroundColor: '#ee6e73',                                    
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,                     
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    item: {
      backgroundColor: 'grey',
      height: 150,
      justifyContent: 'center',
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
});

*/