import React from "react";
import { Button, Text, View, StyleSheet, ScrollView} from "react-native";
import Event from "../components/Event";

function HomeScreen ({navigation}) {
    const data = [
        { id: '1', text: 'Elemento 1' },
        { id: '2', text: 'Elemento 2' },
        { id: '3', text: 'Elemento 3' },
        { id: '4', text: 'Elemento 4' },
        { id: '5', text: 'Elemento 5' },
        // Agrega más elementos según sea necesario
      ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Next Events</Text>
                {Event(data,{navigation},true)}
                <Button title="More Next Events" color={"black"} onPress={() => navigation.navigate('Next Events')}></Button>                   
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Events</Text>
                {Event(data,{navigation},true)}
                <Button title="More Past Events" color={"black"} onPress={() => navigation.navigate('Past Events')}></Button>
            </View>
        </ScrollView>
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