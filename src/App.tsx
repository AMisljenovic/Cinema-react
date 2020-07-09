import React from 'react';
import { Provider } from 'react-redux';
import { useRoutes } from 'hookrouter';
import { Header, Home, Footer } from './components';
import store from './store';
import MovieDetails from './components/MovieDetails/MovieDetails';


const routes = {
  '/': () => <Home />,
  '/home': () => <Home />,
  '/movie-details/:id': () => <MovieDetails />,
};
const App = () => {
  const routeResult = useRoutes(routes);


  return (
    <Provider store={store}>
      <Header />
      {routeResult}
      <Footer />
    </Provider>
  );
};

export default App;
