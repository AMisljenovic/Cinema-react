import { SIGN_IN, SIGN_OUT } from 'actions/types';

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
      payload: { statusCode: res.status },
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
