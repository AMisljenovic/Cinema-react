import { GET_RESERVATIONS_BY_REPERTORY_ID, GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID,
  LOGS_ERROR, RESERVATION_ERROR } from 'actions/types';

const url = `${process.env.REACT_APP_API_URL}/reservations`;
let res:any;

export const getReservationsByRepertoryId = (id) => async (dispatch) => {
  try {
    res = await fetch(`${url}/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();

    dispatch({
      type: GET_RESERVATIONS_BY_REPERTORY_ID,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: { reservationStatusCode: res.status },
    });
  }
};

export const getReservationsByRepertoryAndUserId = (repertoryId, userId) => async (dispatch) => {
  try {
    const res = await fetch(`${url}/${repertoryId}/${userId}`, {
      credentials: 'include',
    });
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
