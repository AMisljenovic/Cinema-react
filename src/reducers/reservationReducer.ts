import { GET_RESERVATIONS_BY_REPERTORY_ID, GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID, LOGS_ERROR } from 'actions/types';


const initalState = {
  seats: [],

};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS_BY_REPERTORY_ID:
      return {
        ...state,
        seats: action.payload,
      };

    case GET_RESERVATIONS_BY_REPERTORY_AND_USER_ID:
      return {
        ...state,
        seats: action.payload,
      };
    default:
      return state;
  }
};
