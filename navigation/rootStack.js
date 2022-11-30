import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import MainScreen from '../screens/MainScreen/MainScreen';

const Tab = createMaterialBottomTabNavigator();

function RootStack() {
  return (
    <Tab.Navigator initialRouteName={'MainScreen'}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Weather',
        }}
        name="MainScreen"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Favorite',
        }}
        name="FavoriteScreen"
        component={FavoriteScreen}
      />
    </Tab.Navigator>
  );
}

export default RootStack;
