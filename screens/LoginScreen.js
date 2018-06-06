import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Radio,
  ListItem,
  Left,
  Right
} from 'native-base';
import { connect } from 'react-redux';
import { logIn } from '../store/actions/userActions';
import { Redirect } from 'react-router';

import MainScreen from './MainScreen';
import Dashboard from './Dashboard';
import ClientList from './ClientList';
import NewDashboard from './NewDashboard';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    type: '',
    loggedIn: ''
  };

  login = () => {
    this.props.logIn(this.state);
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/clients" />;
    }
    return (
      // <ImageBackground
      //   source={require('../assets/adrian-233469-unsplash.jpg')}
      //   style={styles.container}
      // >
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          <Text style={styles.title}>Lambda Labs </Text>
          <Text style={styles.title}>Time Tracker</Text>
          <Form style={styles.form}>
            <Item>
              <Input
                style={styles.inputText}
                onChangeText={email => this.setState({ email })}
                name="email"
                value={this.state.email}
                placeholder="Username"
                type="username"
                autoCapitalize="none"
              />
            </Item>
            <Item>
              <Input
                style={styles.inputText}
                onChangeText={password => this.setState({ password })}
                name="password"
                value={this.state.password}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </Item>
          </Form>

          <Button style={styles.button} onPress={this.login}>
            <Text style={styles.inputText}>Sign in</Text>
          </Button>
          <Text style={styles.tagLine}>Work your days, Get your pay.</Text>
        </Content>
      </Container>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9FB1BC',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    width: 150,
    justifyContent: 'center',
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#7CA982'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    alignSelf: 'center',
    marginTop: 25,
    textShadowColor: '#2E5266',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
    color: 'white'
  },
  inputText: {
    color: 'white'
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  tagLine: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    color: 'white',
    textShadowColor: '#2E5266',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  }
});

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn
  };
};

export default connect(mapStateToProps, { logIn })(LoginScreen);
