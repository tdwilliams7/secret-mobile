import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo } from '../store/actions/userActions';
import { Container, List, ListItem } from 'native-base';
import { Link, Switch, Route } from 'react-router-native';

import ClientList from './ClientList';
import ClientDetail from './ClientDetail';

class Dashboard extends Component {
  state = {
    user: '',
    name: '',
    email: '',
    clients: [],
    hoursLogged: [],
    invoices: [],
    loading: true
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getUserInfo(this.props.user);
      this.setState({
        clients: this.props.clients
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.setState({
        clients: this.props.clients
      });
    }
  }

  render() {
    return (
      // <Container style={styles.container}>
      //   <Text>Dashboard Screen</Text>
      //   <Text>Hey, {this.props.name}</Text>
      //   <List>
      //     {this.props.clients.map((client, i) => {
      //       return (
      //         <ListItem key={i}>
      //           <Text>{client.name}</Text>
      //         </ListItem>
      //       );
      //     })}
      //   </List>
      // </Container>
      <Switch>
        <Route path="/client" component={ClientDetail} />
        <Route exact path="/" component={ClientList} />
      </Switch>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    name: state.userReducer.name,
    email: state.userReducer.email,
    clients: state.userReducer.clients,
    hoursLogged: state.userReducer.hoursLogged,
    invoices: state.userReducer.invoices,
    loading: state.userReducer.loading
  };
};

export default connect(mapStateToProps, { getUserInfo })(Dashboard);
