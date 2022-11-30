import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import Geolocation from '@react-native-community/geolocation';

import {styles} from '../MainScreen/styles';
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

  const dispatch = useDispatch();

  const wholeData = useSelector(getFavoriteList);

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
      if (latitudeSearch && longitudeSearch) {
        const result = Promise.resolve(
          doRequest(latitudeSearch, longitudeSearch, API_KEY),
        );

        result.then(value => {
          setDataForShow(value);
        });
      } else {
        Alert.alert('ERROR', 'Wrong coordinates');
      }
    } catch (e) {
      console.log('ERROR --->', e);
    }
  };

  const onPressFav = () => {
    dispatch(favoriteList(dataForShow));
  };

  const onPressDelete = () => {
    dispatch(favoriteDeleteList(dataForShow));
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {dataForShow ? (
        <>
          <View style={styles.mainViewStyle}>
            <Text style={styles.countryText}>{dataForShow?.sys?.country}</Text>
            <Text style={styles.cityText}>{dataForShow.name}</Text>
            <Text style={styles.weatherDescriptionText}>
              {dataForShow?.weather[0]?.description}
            </Text>
          </View>
          <View style={styles.middleViewStyle}>
            <Text style={styles.middleViewText}>
              Feels Like: {dataForShow.main?.feels_like}
            </Text>
            <Text style={styles.middleViewText}>
              Humidity: {dataForShow.main?.humidity}
            </Text>
            <Text style={styles.middleViewText}>
              Pressure: {dataForShow.main?.pressure}
            </Text>
            <Text style={styles.middleViewText}>
              Temperature: {tempConverter(dataForShow.main?.temp)} °C
            </Text>
            <Text style={styles.middleViewText}>
              Temperature Max: {tempConverter(dataForShow.main?.temp_max)} °C
            </Text>
            <Text style={styles.middleViewText}>
              Temperature Min: {tempConverter(dataForShow.main?.temp_min)} °C
            </Text>
          </View>
          <View style={styles.bottomViewStyle}>
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
              style={styles.searchButtonStyle}
              onPress={searchCity}>
              <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
            {wholeData.some(item => item.id === dataForShow?.id) ? (
              <TouchableOpacity
                onPress={onPressDelete}
                style={styles.deleteButtonStyle}>
                <Text style={styles.deleteText}>Delete from favorite</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onPressFav}
                style={styles.favoriteButtonStyle}>
                <Text style={styles.favoriteText}>Add to favorite</Text>
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
