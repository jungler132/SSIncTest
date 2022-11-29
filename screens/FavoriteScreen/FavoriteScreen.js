import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {styles} from './style';

const FavoriteScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 30, color: 'black', textAlign: 'center'}}>
        FAVORITE SCREEN
      </Text>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
