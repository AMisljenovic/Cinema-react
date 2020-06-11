import { GET_MOVIES, LOGS_ERROR } from './types';

const url = 'https://localhost:44361/api';


export const getMovies = () => async (dispatch) => {
  try {
    debugger;
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
