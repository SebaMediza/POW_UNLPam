import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/HomeScreen";
import EventScreen from "../screens/EventScreen";
import NextEventsScreen from "../screens/NextEventsScreen";
import PastEventsScreen from "../screens/PastEventsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => {
  return (
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
  );
};

const DetailStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Detail Event"
        component={EventScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function Navigation () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabNavigator"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DetailStackScreen" component={DetailStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;