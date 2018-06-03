import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Spinner, Button } from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { stopActiveTimer } from '../store/actions/timestampActions';

class Timer extends Component {
  state = {
    name: '',
    activeTimerId: '',
    startTime: '',
    now: '',
    activeTimer: false,
    loading: true
  };
  componentDidMount() {
    const tick = setInterval(this.setNow, 1000);
    this.setState({ ...this.state, tick });
    axios
      .get(
        `http://localhost:5000/vendor/ts/${this.props.user}/client/${
          this.props.clientId
        }`
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
        }
        this.setState({
          ...this.state,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.tick);
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
    console.log('stop timer clicked');
    this.props.stopActiveTimer(this.state.activeTimerId);
    clearInterval(this.state.tick);
  };

  startTimer = () => {
    console.log('start Timer clicked');
  };

  render() {
    const formattedStart = moment(this.state.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    return (
      <Container style={styles.container}>
        <Content>
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
    hoursLogged: state.userReducer.hoursLogged
  };
};

export default connect(mapStateToProps, { stopActiveTimer })(Timer);
