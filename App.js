import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/rootStack';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
