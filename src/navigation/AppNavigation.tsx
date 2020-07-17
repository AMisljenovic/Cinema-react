import React from 'react';
import { useRoutes } from 'hookrouter';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const AppNavigation = () => {
  const routes = {
    '/': () => <Home />,
    '/home': () => <Home />,
    '/movie-details/:id': ({ id }) => <MovieDetails id={id} />,
  };

  const routeResult = useRoutes(routes);

  return (
    <>
      <Header />
      {routeResult}
      <Footer />
    </>
  );
};

export default AppNavigation;
