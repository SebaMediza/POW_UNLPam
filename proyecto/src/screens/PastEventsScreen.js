import React from "react";
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


export default PastEventsScreen;