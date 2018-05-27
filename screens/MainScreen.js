import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from 'react-navigation';
import { getUserInfo } from '../store/actions/userActions';
import Home from './Home';

class MainScreen extends React.Component {
  static navigationOptions = {
    headerLeft: <Icon name="arrow-back" style={{ paddingLeft: 10 }} />,
    title: 'Time Tracker'
  };

  componentDidMount() {
    this.props.getUserInfo(this.props.user);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main Screnn</Text>
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
    user: state.userReducer.user,
    name: state.userReducer.name,
    email: state.userReducer.email,
    clients: state.userReducer.clients,
    hoursLogged: state.userReducer.hoursLogged,
    invoices: state.userReducer.invoices
  };
};

export default connect(mapStateToProps, { getUserInfo })(MainScreen);
