import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavIcon, Tab } from 'react-router-navigation';
import { Switch, Route, Redirect } from 'react-router';
import { setClientName } from '../store/actions/userActions';
// components
import ClientDetail from './ClientDetail';
import TimestampDetail from './TimestampDetail';
import TabNav from '../components/TabNav';
import { connect } from 'react-redux';

class NewDashboard extends Component {
  // state = {
  //   clientName: this.props.location.state.clientName
  // };
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: this.state.clientName
  //   };
  // };
  // componentDidMount() {
  //   console.log(this.props);
  //   // this.props.setClientName(this.state.clientName);
  // }
  // static navigationOptions = ({ navigation }) => {
  //   return { title: this.state.clientName };
  // };

  render() {
    return (
      <View style={styles.container}>
        <TabNav
          setName={this.props.setName}
          clientId={this.props.match.params.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    clientName: state.userReducer.clientName
  };
};

export default connect(mapStateToProps, { setClientName })(NewDashboard);
