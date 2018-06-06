import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  List,
  ListItem,
  Left,
  Right,
  Container,
  Content,
  Icon,
  Header,
  Card
} from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-native';
import {
  startNewTimer,
  stopActiveTimer
} from '../store/actions/timestampActions';
import { backend } from '../config';
import { getTokenStorage } from '../store/actions/userActions';

class ClientDetail extends Component {
  state = {
    name: '',
    user: '',
    hoursLogged: [],
    invoices: []
  };

  componentDidMount() {
    this.getClient();
  }

  componentWillUnmount() {
    clearInterval(this.state.tick);
    this.setState({
      name: '',
      user: '',
      hoursLogged: [],
      invoices: [],
      activeTimer: false,
      activeTimerId: '',
      activeStartTime: '',
      timer: '00:00'
    });
  }

  getClient = () => {
    this.getTokenStorage()
      .then(storage => {
        const id = this.props.match.params.id;
        axios
          .get(`${backend}/vendor/ts/${this.props.user}/client/${id}`, {
            headers: {
              token: storage.token,
              userType: storage.userType
            }
          })
          .then(({ data }) => {
            this.setState({
              name: data.name,
              hoursLogged: data.hoursLogged,
              invoices: data.invoices
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTokenStorage = async () => {
    try {
      let token = await AsyncStorage.getItem('Authorization');
      let userType = await AsyncStorage.getItem('UserType');
      return { token, userType };
    } catch (err) {
      return { 'error in async stuff': err };
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            {this.state.hoursLogged.map(hour => {
              const start = moment(hour.startTime);

              return (
                <ListItem
                  key={hour._id}
                  onPress={() =>
                    this.props.history.push(`/timestamp/${hour._id}`)
                  }
                >
                  <Left>
                    <Text>{start.format('MM/DD/YYYY')}</Text>
                  </Left>
                  <Right>
                    {hour.active ? (
                      <View>
                        <Icon name="clock" style={styles.icon} />
                      </View>
                    ) : (
                      <Text>{hour.duration}</Text>
                    )}
                  </Right>
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
    backgroundColor: '#D3D0CB',
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    alignSelf: 'center',
    fontSize: 20
  },
  icon: {
    alignSelf: 'center',
    fontSize: 50,
    marginTop: 10
  },
  timer: {
    alignSelf: 'center',
    fontSize: 40
  },
  icon: {
    color: 'black'
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    activeTimer: state.timestampReducer.activeTimer,
    activeTimerId: state.timestampReducer.activeTimerId,
    startTime: state.timestampReducer.startTime,
    clientName: state.userReducer.clientName
    // hoursLogged: state.userReducer.hoursLogged
  };
};

export default connect(mapStateToProps, {
  startNewTimer,
  stopActiveTimer,
  getTokenStorage
})(ClientDetail);
