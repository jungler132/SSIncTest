import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

const Tab = createMaterialBottomTabNavigator();

function RootStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'MainScreen'}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Tab.Navigator>
  );
}

export default RootStack;
