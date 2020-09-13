import React, { Fragment } from 'react';
import { useRoutes } from 'hookrouter';
import Hall from 'pages/Hall';
import Signin from 'pages/SignIn';
import ContactUs from 'pages/ContactUs/ContactUs';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import AdminPanel from 'pages/AdminPanel';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import MovieDetails from '../pages/MovieDetails';
import Home from '../pages/Home';
import Header from './Header';
import Footer from './Footer/Footer';

const AppNavigation = () => {
  const routes = {
    '/': () => <Home />,
    '/home': () => <Home />,
    '/movie-details/:id': ({ id }) => <MovieDetails id={id} />,
    '/hall/:hallId/:repertoryId': ({ hallId, repertoryId }) => <Hall hallId={hallId} repertoryId={repertoryId} />,
    '/signin': () => <Signin />,
    '/contact-us': () => <ContactUs />,
    '/signup': () => <SignUp />,
    '/profile': () => <Profile />,
    '/admin-panel': () => <AdminPanel />,
  };

  const routeResult = useRoutes(routes);

  return (
    <Fragment>
      <Header />
      {routeResult || <PageNotFound />}
      <Footer />
    </Fragment>
  );
};

export default AppNavigation;
