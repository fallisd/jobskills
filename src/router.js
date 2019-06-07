import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from 'routes/LandingPage';
import SearchPage from 'routes/SearchPage';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/search' component={SearchPage} />
      <Redirect from='*' to='/' />
    </Switch>
  </BrowserRouter>
);
