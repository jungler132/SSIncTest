import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import Geolocation from '@react-native-community/geolocation';

import {styles} from './style';
import {doRequest} from '../../services/doRequest';
import {useDispatch, useSelector} from 'react-redux';
import {favoriteDeleteList, favoriteList} from '../FavoriteScreen/saga/action';
import {getFavoriteList} from '../../saga/selectors';

const API_KEY = '2ccf41a60ded8ab3041d05eff597ea11';

const MainScreen = () => {
  const [currentCity, setCurrentCity] = useState([]);
  const [dataForShow, setDataForShow] = useState();
  const [latitudeSearch, setLatitudeSearch] = useState('');
  const [longitudeSearch, setLongitudeSearch] = useState('');
  console.log('currentCity ---->', currentCity);
  console.log('dataForShow ---->', dataForShow);

  const dispatch = useDispatch();

  const wholeData = useSelector(getFavoriteList);

  console.log('WHOLE DATA ---->', wholeData);

  useEffect(() => {}, [wholeData]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = position;
        setCurrentCity(initialPosition);
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );
  }, []);

  useEffect(() => {
    if (Object.keys(currentCity).length !== 0) {
      try {
        const {latitude, longitude} = currentCity.coords;

        const result = Promise.resolve(doRequest(latitude, longitude, API_KEY));

        result.then(value => {
          setDataForShow(value);
        });
      } catch (e) {
        console.log('ERROR --->', e);
      }
    }
  }, [currentCity]);

  const tempConverter = foreng => {
    let fTemp = foreng;
    return String(((fTemp - 32) * 5) / 9).slice(0, 6);
  };

  const searchCity = () => {
    try {
      const result = Promise.resolve(
        doRequest(latitudeSearch, longitudeSearch, API_KEY),
      );

      result.then(value => {
        setDataForShow(value);
      });
    } catch (e) {
      console.log('ERROR --->', e);
    }

    console.log('lat -->', latitudeSearch, 'lon--->', longitudeSearch);
  };

  const onPressFav = () => {
    dispatch(favoriteList(dataForShow));
  };

  const onPressDelete = () => {
    dispatch(favoriteDeleteList(dataForShow));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      {dataForShow ? (
        <>
          <View
            style={{
              width: '60%',
              height: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'blue'}}>
              {dataForShow?.sys?.country}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 25, color: 'blue'}}>
              {dataForShow.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'blue',
                textTransform: 'capitalize',
              }}>
              {dataForShow?.weather[0]?.description}
            </Text>
          </View>
          <View
            style={{
              width: '80%',
              height: '50%',
              borderColor: 'teal',
              borderWidth: 1,
              borderRadius: 30,
              justifyContent: 'space-evenly',
            }}>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Feels Like: {dataForShow.main?.feels_like}
            </Text>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Humidity: {dataForShow.main?.humidity}
            </Text>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Pressure: {dataForShow.main?.pressure}
            </Text>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Temperature: {tempConverter(dataForShow.main?.temp)} °C
            </Text>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Temperature Max: {tempConverter(dataForShow.main?.temp_max)} °C
            </Text>
            <Text style={{padding: 10, color: 'teal', fontSize: 20}}>
              Temperature Min: {tempConverter(dataForShow.main?.temp_min)} °C
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              height: '30%',
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              keyboardType="numeric"
              onChangeText={newText => setLatitudeSearch(newText)}
              defaultValue={latitudeSearch}
              placeholder="Enter Latitude"
              style={{height: 30}}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={newText => setLongitudeSearch(newText)}
              defaultValue={longitudeSearch}
              placeholder="Enter Longitude"
              style={{height: 30, marginTop: 5}}
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: 'teal',
                marginTop: 5,
              }}
              onPress={searchCity}>
              <Text style={{fontSize: 15, textAlign: 'center', color: 'teal'}}>
                Search
              </Text>
            </TouchableOpacity>
            {wholeData.findIndex(item => item.id === dataForShow.id) ? (
              <TouchableOpacity
                onPress={onPressFav}
                style={{
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'teal',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'teal',
                    paddingHorizontal: 5,
                  }}>
                  Add to favorite
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onPressDelete}
                style={{
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'teal',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    color: 'teal',
                    paddingHorizontal: 5,
                  }}>
                  Delete from favorite
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="teal" />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
