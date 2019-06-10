import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import LandingPage from 'routes/LandingPage';
import SearchPage from 'routes/SearchPage';
import ResultPage from 'routes/ResultPage';
import ChartPage from 'routes/ChartPage';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/search' component={SearchPage} />
      <Route path='/chart' component={ChartPage} />
      <Route path='/job/:uuid' render={props => <ResultPage {...props} searchType='Job' key={props.match.params.uuid} />} />
      <Route path='/skill/:uuid' render={props => <ResultPage {...props} searchType='Skill' key={props.match.params.uuid} />} />

      <Redirect from='*' to='/' />
    </Switch>
  </BrowserRouter>
);
