import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Route, Redirect, Switch } from 'react-router';
import { BottomNavigation, Tab } from 'react-router-navigation';
import { HeaderTitle } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spinner } from 'native-base';

import ClientDetail from '../screens/ClientDetail';
import Timer from '../screens/Timer';

class TabNav extends Component {
  state = {
    clientName: '',
    loading: true
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/client/${this.props.match.params.id}`)
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
  }

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
          render={ownProps => (
            <ClientDetail clientId={this.props.clientId} {...ownProps} />
          )}
        />
        <Tab
          path="/timer"
          label="Timer"
          render={clientId => <Timer clientId={this.props.match.params.id} />}
          component={Timer}
        />
      </BottomNavigation>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientName: state.userReducer.clientName
  };
};

export default connect(mapStateToProps, null)(TabNav);
