import { GET_MOVIES } from '../actions/types';
import Movie from '../models/movie.model';


const initalState = {
  movies: [],
  movie: [],
  announcedMovies: [],
  playingMovies: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        announcedMovies: action.payload.filter(movie => movie.playing === false),
        playingMovies: action.payload.filter(movie => movie.playing === true),
      };

    default:
      return state;
  }
};
