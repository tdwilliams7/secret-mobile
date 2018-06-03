import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import { Card, Navigation } from 'react-router-navigation';
import { NativeRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { setClientName } from '../store/actions/userActions';

// screens
import HomeScreen from '../screens/Home';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import ClientDetail from '../screens/ClientDetail';
import TimestampDetail from '../screens/TimestampDetail';
import NewDashboard from '../screens/NewDashboard';
import ClientList from '../screens/ClientList';
import TabNav from './components/TabNav';

class Navigate extends Component {
  render() {
    return (
      <View>
        <NativeRouter>
          <Navigation>
            <Card path={'/clients'} component={ClientList} />
            <Card path={'/timestamp/:id'} component={TimestampDetail} />
            <Card path={'/app/:id'} component={NewDashboard} />
            <Card exact path="/" component={LoginScreen} />
          </Navigation>
        </NativeRouter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    clientName: state.userReducer.clientName
  };
};

export default connect(mapStateToProps, null)(Navigate);
