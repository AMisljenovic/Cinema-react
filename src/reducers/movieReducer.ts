import Movie from 'models/movie.model';
import { GET_MOVIES, SET_LOADING, GET_MOVIE } from '../actions/types';


const initalState = {
  loading: false,
  movies: [],
  selectedMovie: null,
  announcedMovies: [],
  playingMovies: [],
};

type MoviesState = {
  loading: boolean;
  movies: Movie[];
  selectedMovie: Movie | null;
  announcedMovies: Movie[];
  playingMovies: Movie[];
}

type Action = {
  type: typeof GET_MOVIES | typeof SET_LOADING | typeof GET_MOVIE;
  payload: any;
}

export default (state: MoviesState = initalState, action: Action): MoviesState => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        // TODO(am): remove movie from db
        announcedMovies: action.payload.filter(movie => movie.playing === false).slice(0, 5),
        playingMovies: action.payload.filter(movie => movie.playing === true),
        loading: false,
      };

    case GET_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
