import { GET_RESERVATIONS_BY_REPERTORY_ID, GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID, LOGS_ERROR } from 'actions/types';

const url = `${process.env.REACT_APP_API_URL}/reservations`;

export const getReservationsByRepertoryId = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();

    dispatch({
      type: GET_RESERVATIONS_BY_REPERTORY_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const getReservationsByRepertoryAndUserId = (repertoryId, userId) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/${repertoryId}/${userId}`);
    const data = await res.json();

    dispatch({
      type: GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};
