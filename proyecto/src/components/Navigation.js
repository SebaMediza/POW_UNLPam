import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
                <Stack.Screen name="RegistrationScreen" component={RegisterScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;