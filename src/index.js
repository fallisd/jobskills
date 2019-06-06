import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { Provider } from 'react-redux';

import './index.css';

import router from 'router';
import configureStore from 'utils/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return router;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </Provider>,
  document.getElementById('root'),
);
