import axios from 'axios';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_CLIENT = 'ADD_CLIENT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const GETTING_USER_INFO = 'GETTING_USER_INFO';
export const GOT_USER_INFO = 'GOT_USER_INFO';

const backend = process.env.BASE_URL || 'http://localhost:5000';

export const signUp = ({ name, email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post(`${backend}/client`, { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor`, { name, email, password })
        .then(({ data }) => {
          dispatch({ type: SIGNUP, payload: data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const logIn = ({ email, password, type }) => {
  return dispatch => {
    if (type === 'client') {
      axios
        .post(`${backend}/client/login`, { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data, userType: 'client' });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`${backend}/vendor/login`, { email, password })
        .then(({ data }) => {
          dispatch({ type: LOGIN, payload: data, userType: 'vendor' });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const addClient = (email, _id) => {
  return dispatch => {
    axios
      .put(`${backend}/vendor/client/add`, { email, _id })
      .then(({ data }) => {
        dispatch({ type: ADD_CLIENT, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const changePassword = (password, newPassword, userType, id) => {
  return dispatch => {
    if (userType === 'client') {
      axios
        .put(`${backend}/client/settings/${id}`, { password, newPassword })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          dispatch({ type: CHANGE_PASSWORD, payload: data });
          dispatch({ type: PASSWORD_CHANGED });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .put(`${backend}/vendor/settings/${id}`, { password, newPassword })
        .then(({ data }) => {
          window.localStorage.setItem('Authorization', data.token);
          dispatch({ type: CHANGE_PASSWORD, payload: data });
          dispatch({ type: PASSWORD_CHANGED });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
};

export const getUserInfo = id => {
  return dispatch => {
    dispatch({ type: GETTING_USER_INFO });
    axios
      .get(`${backend}/vendor/${id}`)
      .then(({ data }) => {
        dispatch({ type: GOT_USER_INFO, payload: data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
