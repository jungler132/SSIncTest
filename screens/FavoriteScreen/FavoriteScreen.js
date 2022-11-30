import React from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFavoriteList} from '../../saga/selectors';
import {favoriteDeleteList} from './saga/action';

import {styles} from '../FavoriteScreen/styles';

const FavoriteScreen = () => {
  const wholeData = useSelector(getFavoriteList);

  const dispatch = useDispatch();

  const onPressDelete = arg => {
    dispatch(favoriteDeleteList(arg));
  };

  const tempConverter = foreng => {
    let fTemp = foreng;
    return String(((fTemp - 32) * 5) / 9).slice(0, 6);
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.topViewStyle}>
          <Text style={styles.countryText}>{item?.sys?.country}</Text>
          <Text style={styles.cityText}>{item.name}</Text>
          <Text style={styles.weatherText}>
            {item?.weather[0]?.description}
          </Text>
        </View>
        <View style={styles.middleViewStyle}>
          <Text style={styles.middleViewText}>
            Feels Like: {item.main?.feels_like}
          </Text>
          <Text style={styles.middleViewText}>
            Humidity: {item.main?.humidity}
          </Text>
          <Text style={styles.middleViewText}>
            Pressure: {item.main?.pressure}
          </Text>
          <Text style={styles.middleViewText}>
            Temperature: {tempConverter(item.main?.temp)} °C
          </Text>
          <Text style={styles.middleViewText}>
            Temperature Max: {tempConverter(item.main?.temp_max)} °C
          </Text>
          <Text style={styles.middleViewText}>
            Temperature Min: {tempConverter(item.main?.temp_min)} °C
          </Text>
        </View>
        <View style={styles.bottomViewStyle}>
          <TouchableOpacity
            onPress={() => onPressDelete(item)}
            style={styles.deleteButtonStyle}>
            <Text style={styles.buttonText}>Delete from favorite</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.renderSeparator} />;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.favoriteCitiesText}>Favorite cities</Text>
      <FlatList
        keyExtractor={item => item.id}
        renderItem={renderItem}
        data={wholeData}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;
