import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
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
import MainScreen from './MainScreen';
import Dashboard from './Dashboard';
import ClientList from './ClientList';

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
      return <Tabs />;
    }
    return (
      <ImageBackground
        source={require('../assets/adrian-233469-unsplash.jpg')}
        style={styles.container}
      >
        <Container>
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
                />
              </Item>
              <Item>
                <Input
                  style={styles.inputText}
                  onChangeText={password => this.setState({ password })}
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  type="password"
                />
              </Item>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Button onPress={() => this.setState({ type: 'vendor' })}>
                  <Text>Vendor</Text>
                </Button>
                <Button onPress={() => this.setState({ type: 'client' })}>
                  <Text>Client</Text>
                </Button>
              </View>
            </Form>

            <Button style={styles.button} onPress={this.login}>
              <Text style={styles.inputText}>Sign in</Text>
            </Button>
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    marginLeft: 100,
    backgroundColor: 'rgb(64, 127, 127)'
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    marginLeft: 60,
    marginTop: 25,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  inputText: {
    color: 'white'
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
});

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn
  };
};

const Tabs = createBottomTabNavigator({
  Dash: {
    screen: ClientList,
    navigationOptions: {
      tabBarLabel: 'Dashboard'
    }
  },
  Clients: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Clients'
    }
  }
});

export default connect(mapStateToProps, { logIn })(LoginScreen);
