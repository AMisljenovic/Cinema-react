import { GET_HALL, LOGS_ERROR } from 'actions/types';

const url = `${process.env.REACT_APP_API_URL}/halls`;


export const getHall = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();

    dispatch({
      type: GET_HALL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};
