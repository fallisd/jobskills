import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { Provider } from 'react-redux';

import 'css/index.css';
import 'css/landingPage.css';
import 'css/searchPage.css';
import 'css/resultPage.css';
import 'css/chartPage.css';

import 'css/button.css';
import 'css/textinput.css';
import 'css/barchart.css';

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
