import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Home, Footer } from './components';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  </Provider>
);

export default App;
