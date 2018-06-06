import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { Card, Navigation } from 'react-router-navigation';
import { connect } from 'react-redux';

// components
import ClientList from '../screens/ClientList';
import TimestampDetail from '../screens/TimestampDetail';
import NewDashboard from '../screens/NewDashboard';
import LoginScreen from '../screens/LoginScreen';
import TabNav from './TabNav';

class Navigate extends Component {
  state = {
    clientName: ''
  };

  setName = clientName => {
    this.setState({
      clientName
    });
  };

  render() {
    return (
      <NativeRouter>
        <Navigation>
          <Card path={'/clients'} component={ClientList} title="Clients" />
          <Card
            path={'/timestamp/:id'}
            component={TimestampDetail}
            title="Details"
          />
          <Card
            path={'/app/:id'}
            title="Timer Tracker"
            render={props => {
              return <TabNav setName={this.setName} {...props} />;
            }}
            title={this.state.clientName}
          />
          <Card exact path="/" title="Timer Tracker" component={LoginScreen} />
        </Navigation>
      </NativeRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientName: state.userReducer.clientName
  };
};

export default connect(mapStateToProps, null)(Navigate);
