import { GET_MOVIES, LOGS_ERROR, SET_LOADING, GET_MOVIE } from './types';

// const url = 'https://localhost:44361/api';
const url = process.env.REACT_APP_API_URL;


export const getMovies = () => async (dispatch) => {
  try {
    setLoading();

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


export const getMovie = (id) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`${url}/movies/${id}`);
    const data = await res.json();

    dispatch({
      type: GET_MOVIE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};


export const setLoading = () => async (dispatch) => (dispatch({ type: SET_LOADING }));
