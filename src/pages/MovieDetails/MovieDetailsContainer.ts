import { connect } from 'react-redux';
import { getMovie } from 'actions/movieActions';
import { getRepertoryByMovieId } from 'actions/repertoryActions';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import { AppState } from 'reducers';

const mapPropsToState = (state: AppState) => ({
  selectedMovie: state.movies.selectedMovie,
  repertoires: state.repertoires.repertoires,
});

export default connect(mapPropsToState, { getMovie, getRepertoryByMovieId })(MovieDetails);
