import { RESERVATION_ERROR, POST_RESERVATIONS, GET_SEATS_RESERVATIONS,
  SIGN_OUT, GET_CHART_DATA, GET_CHART_DATA_ERROR, GET_USER_RESERVATIONS } from 'actions/types';

const initalState = {
  seats: [],
  userReservedSeats: [],
  reservationStatusCode: null,
  postReservationStatusCode: null,
  chartData: [],
  reservations: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_SEATS_RESERVATIONS:
      return {
        ...state,
        seats: action.payload.seats,
        userReservedSeats: action.payload.userReservedSeats,
      };
    case RESERVATION_ERROR:
      return {
        ...state,
        reservationStatusCode: action.payload.reservationStatusCode,
      };

    case GET_USER_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
      };
    case POST_RESERVATIONS:
      return {
        ...state,
        postReservationStatusCode: action.payload.reservationStatusCode,
      };
    case GET_CHART_DATA:
      return {
        ...state,
        reservationStatusCode: action.payload.reservationStatusCode,
        chartData: action.payload.data,
      };
    case GET_CHART_DATA_ERROR:
      return {
        ...state,
        reservationStatusCode: action.payload.reservationStatusCode,
      };
    case SIGN_OUT:
      return initalState;
    default:
      return state;
  }
};
