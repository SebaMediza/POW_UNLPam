import React from "react";
import { Button, Text, View, StyleSheet, FlatList } from "react-native";

function HomeScreen () {
    const data = [
        { id: '1', text: 'Elemento 1' },
        { id: '2', text: 'Elemento 2' },
        { id: '3', text: 'Elemento 3' },
        { id: '4', text: 'Elemento 4' },
        { id: '5', text: 'Elemento 5' },
        // Agrega más elementos según sea necesario
      ];

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Next Events</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal={true} // Configura la lista como horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                    <View style={{ margin: 10, padding: 50, backgroundColor: 'lightgray' }}>
                        <Text>{item.text}</Text>
                    </View>
                    )}
                />
                <Button title="More Next Events"></Button>                    
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Events</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal={true} // Configura la lista como horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                    <View style={{ margin: 10, padding: 50, backgroundColor: 'lightgray' }}>
                        <Text>{item.text}</Text>
                    </View>
                    )}
                />
                <Button title="More Past Events" buttonStyle={{backgroundColor: "red"}}></Button>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

export default HomeScreen;