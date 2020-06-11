import { GET_MOVIES } from '../actions/types';

const initalState = {
  movies: [],
  movie: [],

};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };

    default:
      return state;
  }
};
