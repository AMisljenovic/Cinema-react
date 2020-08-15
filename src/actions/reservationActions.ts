import { GET_SEATS_RESERVATIONS, RESERVATION_ERROR, POST_RESERVATIONS } from 'actions/types';

const url = `${process.env.REACT_APP_API_URL}/reservations`;
let res:any;

export const getSeatsReservations = (repertoryId, userId) => async (dispatch) => {
  try {
    const res1 = await fetch(`${url}/${repertoryId}`, {
      credentials: 'include',
    });
    const seats = await res1.json();

    const res2 = await fetch(`${url}/${repertoryId}/${userId}`, {
      credentials: 'include',
    });
    const userReservedSeats = await res2.json();

    dispatch({
      type: GET_SEATS_RESERVATIONS,
      payload: { seats, userReservedSeats },
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: error,
    });
  }
};

export const postReservations = (reservations) => async (dispatch) => {
  try {
    res = await fetch(url, {
      credentials: 'include',
      body: JSON.stringify(reservations),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    dispatch({
      type: POST_RESERVATIONS,
      payload: { reservationStatusCode: res.status },
    });
  } catch (error) {
    dispatch({
      type: RESERVATION_ERROR,
      payload: { reservationStatusCode: res.status },
    });
  }
};
