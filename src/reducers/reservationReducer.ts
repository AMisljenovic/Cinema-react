import { GET_RESERVATIONS_BY_REPERTORY_ID, GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID, RESERVATION_ERROR } from 'actions/types';


const initalState = {
  seats: [],
  userReservedSeats: [],
  reservationStatusCode: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_BY_REPERTORY_ID:
      return {
        ...state,
        seats: action.payload,
        reservationStatusCode: null,
      };

    case GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID:
      return {
        ...state,
        userReservedSeats: action.payload,
        reservationStatusCode: null,
      };

    case RESERVATION_ERROR:
      return {
        ...state,
        reservationStatusCode: action.payload.reservationStatusCode,
      };
    default:
      return state;
  }
};
