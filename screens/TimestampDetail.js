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
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';

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
    axios
      .get(`http://localhost:5000/timestamp/${this.props.match.params.id}`)
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
  }

  onSubmitHandler = () => {
    console.log(this.state);
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
