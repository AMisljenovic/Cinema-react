import { GET_SEATS_RESERVATIONS, RESERVATION_ERROR, POST_RESERVATIONS,
  GET_CHART_DATA, GET_CHART_DATA_ERROR, GET_USER_RESERVATIONS, DELETE_RESERVATIONS, CLEAR } from 'actions/types';

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

export const getReservations = (userId) => async (dispatch) => {
  try {
    res = await fetch(`${url}/user/${userId}`, {
      credentials: 'include',
      method: 'GET',
    });

    const data = await res.json();

    dispatch({
      type: GET_USER_RESERVATIONS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
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

export const getChartData = () => async (dispatch) => {
  try {
    res = await fetch(url, {
      credentials: 'include',
      method: 'GET',
    });

    if (res.status > 300) {
      dispatch({
        type: GET_CHART_DATA_ERROR,
        payload: { reservationStatusCode: res.status },
      });
    }

    const data = await res.json();

    dispatch({
      type: GET_CHART_DATA,
      payload: { data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReservations = (reservationIds) => async (dispatch) => {
  try {
    res = await fetch(`${url}/delete`, {
      body: JSON.stringify(reservationIds),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
    });

    dispatch({
      type: DELETE_RESERVATIONS,
      payload: { deleteStatusCode: res.status },
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearAction = () => async (dispatch) => { dispatch({ type: CLEAR }); };
