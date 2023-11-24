import React from "react";
import { Button, Text, View, FlatList } from "react-native";

function Event(data,{navigation},horizontal){
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal={horizontal} // Configura la lista como horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (     
                <View style={{ margin: 10, padding: 50, backgroundColor: 'lightgray' }}>
                    <Text>{item.text}</Text>
                    <Button title="Details" onPress={()=> navigation.navigate("DetailStackScreen")}></Button>
                </View>                     
            )}
        />
    )
}

export default Event;