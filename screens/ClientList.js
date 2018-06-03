import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUserInfo } from '../store/actions/userActions';
import {
  Container,
  List,
  ListItem,
  Content,
  Card,
  CardItem,
  Body
} from 'native-base';
import { Link, withRouter } from 'react-router-native';
import ClientDetail from './ClientDetail';

class ClientList extends Component {
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

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text>ClientList Screen</Text>
          <Text>Hey, {this.props.name}</Text>
          <List>
            {this.props.clients.map((client, i) => {
              return (
                <ListItem
                  key={i}
                  style={styles.card}
                  onPress={() =>
                    this.props.history.push({
                      pathname: `/app/${client._id}`,
                      state: {
                        clientName: client.name
                      }
                    })
                  }
                >
                  <Text>{client.name}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    marginBottom: 5
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

export default withRouter(
  connect(mapStateToProps, { getUserInfo })(ClientList)
);
