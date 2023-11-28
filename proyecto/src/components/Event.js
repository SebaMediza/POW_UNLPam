import React from "react";
import { Button, Text, View, FlatList, Image } from "react-native";

function Event(data,{navigation},horizontal){
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.idMovie}
            horizontal={horizontal} // Configura la lista como horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (     
                <View style={{ margin: 10, padding: 50, backgroundColor: 'lightgray' }}>
                    <Text>{item.titulo}</Text>
                    <Image
                        scr={item.banner}
                        width={181}
                        height={271.5}
                        />
                    <Button title="Details" onPress={()=> navigation.navigate("DetailStackScreen", {idMovie: item.idMovie})}></Button>
                </View>                     
            )}
        />
    )
}

export default Event;