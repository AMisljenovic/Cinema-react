import { connect } from 'react-redux';
import { getMovies } from '../../actions/movieActions';
import Home from './Home';

const mapPropsToState = (state) => ({
  movies: state.movies.movies,
  announcedMovies: state.movies.announcedMovies,
  playingMovies: state.movies.playingMovies,
  loading: state.movies.loading,
});

export default connect(mapPropsToState, { getMovies })(Home);
