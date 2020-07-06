import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
import JqxScrollView from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscrollview';
import PropTypes from 'prop-types';
import * as actions from '../../actions/movieActions';
import ImageDisplay from '../ImageDisplay/ImageDisplay';
import './Home.css';


const Home = ({ getMovies, movies, announcedMovies, playingMovies, loading }) => {
  const wideIds = ['wide-0fe4656a-4598-4f6f-9e7c-3f9347153a10',
    'wide-13e6d16d-e8a9-4112-a3d0-fda72a846b17', 'wide-164ca3af-4b7f-454f-bd07-9b8d6c3736cc',
    'wide-1df1dac8-0b73-486e-b1a0-ded9d9d0849c', 'wide-251759f9-a3c5-43d3-9734-39a288f2a461'];

  const myLoader = React.createRef<JqxLoader>();
  useEffect(() => {
    getMovies();
    if (myLoader.current && playingMovies.length === 0) {
      myLoader.current.open();
    }

    if (myLoader.current && playingMovies.length > 0) {
      myLoader.current.close();
    }
  }, []);

  const selectMovie = (event) => {
    console.log(event);
  };

  const toMovieDetails = id => {
    const movieId = id.replace('wide-', '');
    debugger;
  };


  if (playingMovies.length === 0) {
    return (<JqxLoader ref={myLoader} imagePosition="top" width={300} height={200} />);
  }

  return (
    <div id="wrapper">
      <JqxScrollView slideShow={false} slideDuration={4000} width="960" height="540">
        {
          wideIds.map(id => <ImageDisplay renderProp={(image) => <div style={{ backgroundImage: `url(${image})` }} className="photo" onClick={() => toMovieDetails(id)} />} imageUrl={id} />)
        }
      </JqxScrollView>
      <h1>
        Now Playing
      </h1>
      <div className="all-movies">

        {
          playingMovies.map(movie => <ImageDisplay renderProp={(image) => <img className="all-movies-poster" src={image} alt="" onClick={() => toMovieDetails(movie.id)} />} imageUrl={movie.id} />)
        }
      </div>
      <h1>
        Coming Soon
      </h1>
      <div className="all-movies">
        {
          announcedMovies.map(movie => <ImageDisplay renderProp={(image) => <img className="all-movies-poster" src={image} alt="" onClick={() => toMovieDetails(movie.id)} />} imageUrl={movie.id} />)
        }
      </div>
    </div>
  );
};

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  announcedMovies: PropTypes.array.isRequired,
  playingMovies: PropTypes.array.isRequired,
};

const mapPropsToState = (state) => ({
  movies: state.movies.movies,
  announcedMovies: state.movies.announcedMovies,
  playingMovies: state.movies.playingMovies,
  loading: state.movies.loading,
});

export default connect(mapPropsToState, actions)(Home);
