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
