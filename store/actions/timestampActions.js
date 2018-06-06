import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
// const backend = process.env.BASE_URL || 'http://localhost:5000';
import { backend } from '../../config';

const getTokenStorage = async () => {
  try {
    let token = await AsyncStorage.getItem('Authorization');
    let userType = await AsyncStorage.getItem('UserType');
    return { token, userType };
  } catch (err) {
    return { 'error in async stuff': err };
  }
};

export const startNewTimer = (vendorId, clientId) => {
  return dispatch => {
    getTokenStorage()
      .then(storage => {
        axios
          .post(
            `${backend}/timestamp/start`,
            { vendorId, clientId },
            {
              headers: {
                token: storage.token,
                userType: storage.userType
              }
            }
          )
          .then(({ data }) => {
            dispatch({ type: START_TIMER, payload: data });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const stopActiveTimer = timestampId => {
  return dispatch => {
    getTokenStorage()
      .then(storage => {
        axios
          .put(
            `${backend}/timestamp/stop`,
            { timestampId },
            {
              headers: {
                token: storage.token,
                userType: storage.userType
              }
            }
          )
          .then(({ data }) => {
            dispatch({ type: STOP_TIMER, payload: data });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
