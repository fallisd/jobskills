import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';

import './index.css';

import router from './router';

class App extends Component {
  render() {
    return router;
  }
}
ReactDOM.render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>,
  document.getElementById('root'),
);
