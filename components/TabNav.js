import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Route, Redirect, Switch } from 'react-router';
import { BottomNavigation, Tab } from 'react-router-navigation';
import { HeaderTitle } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spinner, Icon } from 'native-base';

import ClientDetail from '../screens/ClientDetail';
import Timer from '../screens/Timer';
import { backend } from '../config';

class TabNav extends Component {
  state = {
    clientName: '',
    loading: true
  };

  componentDidMount() {
    this.getTokenStorage()
      .then(storage => {
        axios
          .get(`${backend}/client/${this.props.match.params.id}`, {
            headers: {
              token: storage.token,
              userType: storage.userType
            }
          })
          .then(({ data }) => {
            this.setState({
              ...this.state,
              clientName: data.name,
              loading: false
            });
            this.props.setName(data.name);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  getTokenStorage = async () => {
    try {
      let token = await AsyncStorage.getItem('Authorization');
      let userType = await AsyncStorage.getItem('UserType');
      return { token, userType };
    } catch (err) {
      console.log('error in async stuff', err);
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View>
          <Spinner />
        </View>
      );
    }
    return (
      <BottomNavigation>
        <Tab
          path={`/app/:id`}
          label="ClientDetail"
          renderTabIcon={() => {
            return <Icon name="eye" style={styles.icon} />;
          }}
          render={ownProps => (
            <ClientDetail clientId={this.props.clientId} {...ownProps} />
          )}
        />
        <Tab
          path="/timer"
          label="timer"
          renderTabIcon={() => {
            return <Icon name="clock" style={styles.icon} />;
          }}
          render={clientId => <Timer clientId={this.props.match.params.id} />}
          component={Timer}
        />
      </BottomNavigation>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: '#2E5266'
  }
});

const mapStateToProps = state => {
  return {
    clientName: state.userReducer.clientName
  };
};

export default connect(mapStateToProps, null)(TabNav);
