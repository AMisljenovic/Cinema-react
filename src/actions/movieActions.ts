import { GET_MOVIES, LOGS_ERROR } from './types';

// const url = 'https://localhost:44361/api';
const url = process.env.REACT_APP_API_URL;


export const getMovies = () => async (dispatch) => {
  try {
    const res = await fetch(`${url}/movies`);
    const data = await res.json();

    dispatch({
      type: GET_MOVIES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const getMovie = () => async (dispatch) => {

};
