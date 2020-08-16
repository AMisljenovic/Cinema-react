import { SIGN_IN, SIGN_OUT, SIGN_UP, SIGN_UP_ERROR, LOGGED_IN_AS_ADMIN, DELETE_USER, CLEAR } from 'actions/types';

const url = `${process.env.REACT_APP_API_URL}/users`;
let res: any;
export const signIn = (username = '', email = '', password) => async (dispatch) => {
  try {
    res = await fetch(`${url}/signin`, {
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });

    const data = await res.json();

    dispatch({
      type: SIGN_IN,
      payload: { data, statusCode: res.status },
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN,
      payload: { data: null, statusCode: res.status },
    });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    res = await fetch(`${url}/signout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });

    dispatch({
      type: SIGN_OUT,
      payload: { statusCode: res.status },
    });
  } catch (error) {
    dispatch({
      type: SIGN_OUT,
      payload: { statusCode: res.status },
    });
  }
};

export const signUp = (user) => async (dispatch) => {
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status > 300) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: { error: { error: data, status: res.status } },
      });

      return;
    }


    dispatch({
      type: SIGN_UP,
      payload: { error: { status: res.status } },
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_ERROR,
      payload: { error },
    });
  }
};

export const loggedInAsAdmin = () => async (dispatch) => {
  try {
    res = await fetch(url, {
      credentials: 'include',
      method: 'GET',
    });

    dispatch({
      type: LOGGED_IN_AS_ADMIN,
      payload: { adminStatusCode: res.status },
    });
  } catch (error) {
    dispatch({
      type: LOGGED_IN_AS_ADMIN,
      payload: { adminStatusCode: res.status },
    });
  }
};

export const deleteUser = (user) => async (dispatch) => {
  try {
    res = await fetch(`${url}/delete`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(user),
    });

    dispatch({
      type: DELETE_USER,
      payload: { deleteStatusCode: res.status },
    });
  } catch (error) {
    console.log(error);
  }
};
