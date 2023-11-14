import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen';
import NextEventsScreen from './src/screens/NextEventsScreen';
import PastEventsScreen from './src/screens/PastEventsScreen';
import Navigation from './src/components/Navigation';

const Tab = createBottomTabNavigator();

function App () {
  return (
    <Navigation></Navigation>
  );
    /*return (
      <NavigationContainer>
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
    );*/
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
