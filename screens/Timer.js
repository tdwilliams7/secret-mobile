import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Spinner, Button } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {
  stopActiveTimer,
  startNewTimer
} from '../store/actions/timestampActions';
import { backend } from '../config';

class Timer extends Component {
  state = {
    name: '',
    activeTimerId: '',
    startTime: '',
    now: '',
    activeTimer: false,
    loading: true
    // tick: setInterval(this.setNow, 1000)
  };
  componentDidMount() {
    this.getTokenStorage()
      .then(storage => {
        axios
          .get(
            `${backend}/vendor/ts/${this.props.user}/client/${
              this.props.clientId
            }`,
            {
              headers: {
                token: storage.token,
                userType: storage.userType
              }
            }
          )
          .then(({ data }) => {
            const active = data.hoursLogged.filter(timestamp => {
              return timestamp.active === true;
            });
            if (active.length) {
              this.setState({
                ...this.state,
                activeTimer: true,
                activeTimerId: active[0]._id,
                startTime: active[0].startTime
              });
              this.tick = setInterval(this.setNow, 1000);
            }
            this.setState({
              ...this.state,
              loading: false
            });
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
      return { 'error in async stuff': err };
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.activeTimerId) {
      this.setState({
        ...this.state,
        activeTimerId: this.props.activeTimerId
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.tick);
    this.setState({
      name: '',
      activeTimerId: '',
      startTime: '',
      now: '',
      activeTimer: false,
      loading: true
    });
  }

  setNow = () => {
    this.setState({
      ...this.state,
      now: Date.now()
    });
  };

  stopTimer = () => {
    this.props.stopActiveTimer(this.state.activeTimerId);
    clearInterval(this.tick);
  };

  startTimer = () => {
    this.props.startNewTimer(this.props.user, this.props.clientId);
    this.setState({
      ...this.state,
      activeTimer: true,
      startTime: Date.now()
    });
    this.tick = setInterval(this.setNow, 1000);
  };

  render() {
    const formattedStart = moment(this.state.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          {this.state.loading ? (
            <Spinner />
          ) : this.state.activeTimer ? (
            <View>
              <Text style={styles.timer}>
                {moment(duration._data).format('HH:mm:ss')}
              </Text>
              <Button
                rounded
                style={styles.stopButton}
                onPress={this.stopTimer}
              >
                <Text style={styles.text}>Stop Timer</Text>
              </Button>
            </View>
          ) : (
            <View>
              <Text style={styles.timer}>00:00:00</Text>
              <Button
                rounded
                style={styles.startButton}
                onPress={this.startTimer}
              >
                <Text style={styles.text}>Start Timer</Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D3D0CB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stopButton: {
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#E2C044'
  },
  startButton: {
    alignSelf: 'center',
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#7CA982'
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  timer: {
    alignSelf: 'center',
    fontSize: 50,
    color: '#2E5266',
    marginBottom: 50
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    hoursLogged: state.userReducer.hoursLogged,
    activeTimerId: state.timestampReducer.activeTimerId,
    startTime: state.timestampReducer.startTime
  };
};

export default connect(mapStateToProps, { stopActiveTimer, startNewTimer })(
  Timer
);
