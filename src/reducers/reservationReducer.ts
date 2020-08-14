import { RESERVATION_ERROR, POST_RESERVATIONS, GET_SEATS_RESERVATIONS, SIGN_OUT } from 'actions/types';

const initalState = {
  seats: [],
  userReservedSeats: [],
  reservationStatusCode: null,
  postReservationStatusCode: null,
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
    case POST_RESERVATIONS:
      return {
        ...state,
        postReservationStatusCode: action.payload.reservationStatusCode,
      };
    case SIGN_OUT:
      return initalState;
    default:
      return state;
  }
};
