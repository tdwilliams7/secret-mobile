import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import Home from './screens/Home';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';

import HomeScreen from './screens/Home';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import ClientDetail from './screens/ClientDetail';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

export const AppStackNavigator = createStackNavigator({
  Main: LoginScreen,
  Dashboard: MainScreen,
  ClientDetail: ClientDetail
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
