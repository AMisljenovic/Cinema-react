import { GET_MOVIES, SET_LOADING } from '../actions/types';
import Movie from '../models/movie.model';


const initalState = {
  loading: false,
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
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
