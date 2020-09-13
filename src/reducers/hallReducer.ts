import { GET_HALL } from 'actions/types';

const initalState = {
  hall: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_HALL:
      return {
        ...state,
        hall: action.payload,
      };

    default:
      return state;
  }
};
