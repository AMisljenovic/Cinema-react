import { GET_REPERTORY_BY_MOVIE_ID } from '../actions/types';

const initalState = {
  repertoires: [],
  repertory: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_REPERTORY_BY_MOVIE_ID:
      return {
        ...state,
        repertoires: action.payload,
      };

    default:
      return state;
  }
};
