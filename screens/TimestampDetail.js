import React, { Component } from 'react';
import {
  Container,
  Content,
  Right,
  Left,
  Form,
  Input,
  Textarea,
  Item,
  Button
} from 'native-base';
import { Text, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { backend } from '../config';

class TimestampDetail extends Component {
  state = {
    startTime: '',
    endTime: '',
    clientName: '',
    comments: '',
    duration: '',
    date: '',
    hour: 0,
    minutes: 0
  };

  componentDidMount() {
    this.getTokenStorage()
      .then(storage => {
        axios
          .get(`${backend}/timestamp/${this.props.match.params.id}`, {
            headers: {
              token: storage.token,
              userType: storage.userType
            }
          })
          .then(({ data }) => {
            this.setState({
              startTime: data.startTime,
              endTime: data.endTime,
              clientName: data.client.name,
              comments: data.comments,
              duration: data.duration,
              date: moment(data.startTime).format('MM/DD/YYYY')
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

  onSubmitHandler = () => {
    const newEndTime = moment(this.state.startTime)
      .add(Number(this.state.hours), 'hours')
      .add(Number(this.state.mins), 'minutes');
    this.getTokenStorage()
      .then(storage => {
        axios
          .put(
            `${backend}/timestamp/${this.props.match.params.id}`,
            {
              newTimestamp: this.state,
              endTime: newEndTime,
              duration: this.state.duration
            },
            {
              headers: {
                token: storage.token,
                userType: storage.userType
              }
            }
          )
          .then(({ data }) => {
            this.setState({
              comments: data.comments,
              endTime: data.endTime,
              duration: data.duration
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

  editTimestamp = event => {
    event.preventDefault();
    this.getTokenStorage()
      .then(storage => {
        const newDuration = `${this.state.hours}:${this.state.minutes}`;
        this.setState({
          duration: `${this.state.hours}:${this.state.minutes}`
        });
        const newEndTime = moment(this.state.startTime)
          .add(Number(this.state.hours), 'hours')
          .add(Number(this.state.mins), 'minutes');

        axios
          .put(
            `${backend}/timestamp/${this.props.match.params.id}`,
            {
              newTimestamp: this.state,
              endTime: newEndTime,
              duration: newDuration
            },
            {
              headers: {
                token: storage.token,
                userType: storage.userType
              }
            }
          )
          .then(updatedTStamp => {
            this.setState({
              comments: updatedTStamp.comments,
              endTime: updatedTStamp.endTime,
              duration: updatedTStamp.duration
            });
            this.setState({
              successModal: true
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
          <Form>
            <Text style={styles.title}>{this.state.clientName}</Text>
            <Text>{this.state.date}</Text>
            <Item>
              <Input
                value={this.state.duration}
                onChangeText={duration => this.setState({ duration })}
              />
            </Item>
            <Item>
              <Textarea
                value={this.state.comments}
                onChangeText={comments => this.setState({ comments })}
              />
            </Item>
          </Form>
          <Button onPress={this.onSubmitHandler} style={styles.button}>
            <Text>Submit Changes</Text>
          </Button>
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
  title: {
    alignSelf: 'center',
    fontSize: 20
  },
  button: {
    alignSelf: 'center'
  }
});

export default TimestampDetail;
