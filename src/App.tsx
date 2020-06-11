import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Header, Home, Footer } from './components';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Header />
      <Home />
      <Footer />
    </Fragment>
  </Provider>
);

export default App;
