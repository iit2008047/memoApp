import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import {batch} from '../reduxBatchDispatch';

let store = null;

function getInitialState() {
  return {};
}

export default function configureStore(initialState = getInitialState()) {
  if (store) {
    return store;
  }

  const middlewares = [thunk, batch];
  if (__DEV__) {
    middlewares.push(logger);
  }

  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  store.asyncReducers = {};
  return store;
}
