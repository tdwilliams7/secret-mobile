import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import styled from 'styled-components';
import pic from '../assets/adrian-233469-unsplash.jpg';
import { Icon } from 'native-base';

// import { createBottomTabNavigator } from 'react-navigation';

class HomeScreen extends Component {
  static navigationOptions = {
    headerLeft: <Icon name="arrow-back" style={{ paddingLeft: 10 }} />,
    title: 'Time Tracker'
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/adrian-233469-unsplash.jpg')}
        style={styles.container}
      >
        <Text>Funky stuff is going on</Text>
      </ImageBackground>
    );
  }
}

// const AppTabNavigator = createBottomTabNavigator({
//   HomeTab: {
//     screen: HomeScreen
//   }
// });

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

    alignSelf: 'stretch'
  }
  // backgroundImage: {
  //   height:
  // }
});

export default HomeScreen;
