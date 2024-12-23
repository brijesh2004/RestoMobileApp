import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './Home';
import Items from './Items';
import Cart from './Cart';
import Login from './Login';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

const Main= () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home'
          }}
        />
        <Stack.Screen
        name='Items'
        component={Items}
        options={{
          title:"Items Available"
        }}
        />
        <Stack.Screen
        name='Cart'
        component={Cart}
        options={{
          title:"Cart",
        }}
        />
        <Stack.Screen 
        name='Login'
        component={Login}
        options={{
          title:'Login'
        }}/>
        <Stack.Screen 
        name='Profile'
        component={Profile}
        options={{
          title:'Profile'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({
  uppertonav:{
    marginBottom:200,
  }
})