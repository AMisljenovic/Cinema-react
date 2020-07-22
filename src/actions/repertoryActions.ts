import { GET_REPERTORY_BY_MOVIE_ID, GET_REPERTORY_BY_ID, LOGS_ERROR } from './types';

// const url = 'https://localhost:44361/api';
const url = `${process.env.REACT_APP_API_URL}/repertoires`;

export const getRepertoryByMovieId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();

    dispatch({
      type: GET_REPERTORY_BY_MOVIE_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const getRepertoryById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/repertory/${id}`);
    const data = await res.json();

    dispatch({
      type: GET_REPERTORY_BY_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};
