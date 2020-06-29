import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
import JqxScrollView from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscrollview';
import PropTypes from 'prop-types';
import * as actions from '../../actions/movieActions';
import wide0 from '../../assets/wide-0fe4656a-4598-4f6f-9e7c-3f9347153a10.jpg';
import wide1 from '../../assets/wide-13e6d16d-e8a9-4112-a3d0-fda72a846b17.jpg';
import wide2 from '../../assets/wide-164ca3af-4b7f-454f-bd07-9b8d6c3736cc.jpg';
import wide3 from '../../assets/wide-1df1dac8-0b73-486e-b1a0-ded9d9d0849c.jpg';
import wide4 from '../../assets/wide-251759f9-a3c5-43d3-9734-39a288f2a461.jpg';


const Home = ({ getMovies, movies, announcedMovies, playingMovies }) => {
  const movieIds: string[] = [
    '0fe4656a-4598-4f6f-9e7c-3f9347153a10',
    '13e6d16d-e8a9-4112-a3d0-fda72a846b17',
    '164ca3af-4b7f-454f-bd07-9b8d6c3736cc',
    '1df1dac8-0b73-486e-b1a0-ded9d9d0849c',
    '251759f9-a3c5-43d3-9734-39a288f2a461',
  ];

  useEffect(() => {
    getMovies();
    debugger;
  }, []);


  const isServerDown = true;

  const selectMovie = (event) => {
    console.log(event);
  };


  // if (!isServerDown) {
  //   return (<JqxLoader imagePosition="top" width="150" height="90" />);
  // }
  // {movieIds.forEach(id => (
  //   <div
  //     className="photo"
  //     onClick={(event) => selectMovie(event)}
  //     style={{ backgroundImage: `url(assets/wide-${movieIds[id]}.jpg)` }}
  //   />
  // ))}


  return (
    <div id="wrapper">
      <JqxScrollView slideShow={false} slideDuration={4000} width="960" height="540">
        <div id="wide-0" style={{ backgroundImage: `url(${wide0})` }} className="photo" onClick={selectMovie} />
        <div id="wide-1" style={{ backgroundImage: `url(${wide1})` }} className="photo" onClick={selectMovie} />
        <div id="wide-2" style={{ backgroundImage: `url(${wide2})` }} className="photo" onClick={selectMovie} />
        <div id="wide-3" style={{ backgroundImage: `url(${wide3})` }} className="photo" onClick={selectMovie} />
        <div id="wide-4" style={{ backgroundImage: `url(${wide4})` }} className="photo" onClick={selectMovie} />
      </JqxScrollView>
      <h1>
        Now Playing
      </h1>
      <div className="all-movies">
        <img id="playing-0" className="all-movies-poster" alt="now playing" onClick={selectMovie} />
        <img id="playing-1" className="all-movies-poster" alt="now playing" onClick={selectMovie} />
        <img id="playing-2" className="all-movies-poster" alt="now playing" onClick={selectMovie} />
        <img id="playing-3" className="all-movies-poster" alt="now playing" onClick={selectMovie} />
        <img id="playing-4" className="all-movies-poster" alt="now playing" onClick={selectMovie} />
      </div>
      <h1>
        Coming Soon
      </h1>
      <div className="all-movies">
        <img id="coming-0" className="all-movies-poster-coming" alt="coming soon" onClick={selectMovie} />
        <img id="coming-1" className="all-movies-poster-coming" alt="coming soon" onClick={selectMovie} />
        <img id="coming-2" className="all-movies-poster-coming" alt="coming soon" onClick={selectMovie} />
        <img id="coming-3" className="all-movies-poster-coming" alt="coming soon" onClick={selectMovie} />
        <img id="coming-4" className="all-movies-poster-coming" alt="coming soon" onClick={selectMovie} />
      </div>
    </div>
  );
};

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  // announcedMovies: PropTypes.array.isRequired,
  // playingMovies: PropTypes.array.isRequired,
};

const mapPropsToState = (state) => ({
  movies: state.movies.movies,
  announcedMovies: state.movies.announcedMovies,
  playingMovies: state.movies.playingMovies,
});

export default connect(mapPropsToState, actions)(Home);
