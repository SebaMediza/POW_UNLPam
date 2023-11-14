import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/HomeScreen";
//import LoginScreen from "../screens/LoginScreen";
//import RegisterScreen from "../screens/RegisterScreen";
import EventScreen from "../screens/EventScreen";
import NextEventsScreen from "../screens/NextEventsScreen";
import PastEventsScreen from "../screens/PastEventsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DetailScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Detail Event" component={EventScreen} />
        {/* Otras pantallas de Detail Event si las tienes */}
      </Stack.Navigator>
    );
  };


function Navigation () {
    return (
        <NavigationContainer>
            {/*<Stack.Navigator >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegistrationScreen" component={RegisterScreen} />
                <Stack.Screen name="NextEventsScreen" component={NextEventsScreen} />
                <Stack.Screen name="PastEventsScreen" component={PastEventsScreen} />
                <Stack.Screen name="EventScreen" component={EventScreen}/>
    </Stack.Navigator>*/}
            <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                        iconName = focused
                        ? 'ios-home'
                        : 'ios-home-outline';
                    } else if (route.name === 'Next Events') {
                        iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                    }else if (route.name === 'Past Events') {
                      iconName = focused ? 'ios-folder' : 'ios-folder-outline';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#fdfd9b',
                  tabBarInactiveTintColor: 'white',
                  tabBarActiveBackgroundColor: 'grey',
                  tabBarInactiveBackgroundColor: 'grey',
              })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Next Events" component={NextEventsScreen} />
                <Tab.Screen name="Past Events" component={PastEventsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;