import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

class ClientDetail extends Component {
  state = {
    name: '',
    user: '',
    hoursLogged: [],
    invoices: [],
    activeTimer: false,
    activeTimerId: '',
    activeStartTime: '',
    timer: '00:00'
  };

  componentDidMount() {
    this.getClient();
    const tick = setInterval(this.setTimer, 1000);
    this.setState({ tick });
    // console.log(this.props);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.clientName !== this.props.clientName) {
  //     console.log(this.props.clientName);
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeTimer !== prevProps.activeTimer &&
      this.props.activeTimer === true
    ) {
      this.tick();
    }
    // set state again with
    // if (prevProps.activeTimer && !this.props.activeTimer) {
    //   this.props.getUserInfo(this.props.user, this.props.userType);
    // }
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
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/vendor/ts/${this.props.user}/client/${id}`)
      .then(({ data }) => {
        this.setState({
          name: data.name,
          hoursLogged: data.hoursLogged,
          invoices: data.invoices
        });
        const active = data.hoursLogged.filter(timestamp => {
          return timestamp.active === true;
        });
        if (active.length) {
          this.setState({
            activeTimerId: active[0]._id,
            activeStartTime: active[0].startTime
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  startTimer = () => {
    this.props.startNewTimer(this.props.user, this.props.match.params.id);
  };

  stopTimer = () => {
    this.props.stopActiveTimer(this.props.activeTimerId);
    clearInterval(this.state.tick);
  };

  tick = () => {
    this.state.tick;
  };

  setTimer = () => {
    const formattedStart = moment(this.props.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    const timer = moment(duration._data).format('HH:mm:ss');

    this.setState({
      ...this.state,
      timer
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List>
            {this.state.hoursLogged.map(hour => {
              const start = moment(hour.startTime);
              const end = moment(hour.endTime);

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
                    <Text>{hour.duration}</Text>
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

export default connect(mapStateToProps, { startNewTimer, stopActiveTimer })(
  ClientDetail
);
