import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from 'reducers/reducers';

export default function configureStore() {
  const enhancers = compose(
    applyMiddleware(thunkMiddleware),
  );

  const store = createStore(
    reducers,
    enhancers,
  );

  return store;
}
