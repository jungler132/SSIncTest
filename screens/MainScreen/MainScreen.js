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
import {TextInput} from 'react-native-paper';

import Geolocation from '@react-native-community/geolocation';

import {styles} from './style';
import {doRequest} from '../../services/doRequest';

const API_KEY = '2ccf41a60ded8ab3041d05eff597ea11';

const MainScreen = () => {
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => setCurrentCity(info));
  }, []);

  useEffect(() => {
    if (Object.keys(currentCity).length !== 0) {
      const {latitude, longitude} = currentCity.coords;

      const result = doRequest(latitude, longitude, API_KEY);

      console.log('result --->', result);
    }
  }, [currentCity]);

  console.log('currentCity ---->', currentCity);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: '60%',
          height: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center', fontSize: 25, color: 'blue'}}>
          City Name
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: '50%',
          borderColor: 'red',
          borderWidth: 1,
        }}
      />
      <View
        style={{width: '60%', height: '20%', justifyContent: 'space-evenly'}}>
        <TextInput />
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            backgroundColor: 'teal',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
