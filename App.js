import React from 'react';
import { StyleSheet,  View, } from 'react-native';
import { Header } from 'react-native-elements';
import Recipes from './components/Recipes';
import Home from './components/Home';
import Shoppinglist from './components/Shoppinlist';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    
  return(
    <NavigationContainer>
    <Header
    centerComponent={{ text: 'RECIPE FINDER', style: { color: '#fff' } }}
    containerStyle={{backgroundColor: 'gray'}}
    />
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Gategories') {
            iconName = 'ios-restaurant';
            color = focused ? 'pink' : 'gray';
          } else if (route.name === 'Recipes') {
            iconName = 'ios-search'
            color = focused ? 'pink' : 'gray';
          } else if (route.name === 'Shoppinglist') {
            iconName = 'ios-basket'
            color = focused ? 'pink' : 'gray';
        }
          return <Ionicons name={iconName} size={30} color={color} />;
        }
      })}>
      <Tab.Screen name='Gategories' component={Home} />
        <Tab.Screen name='Recipes' component={Recipes} />
        <Tab.Screen name='Shoppinglist' component={Shoppinglist} />
      </Tab.Navigator>
    </NavigationContainer>
  );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});