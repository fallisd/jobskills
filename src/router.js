import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from 'routes/LandingPage';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Redirect from='*' to='/' />
    </Switch>
  </BrowserRouter>
);
