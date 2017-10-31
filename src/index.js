import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import getConfig from './firebase/config';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

// Use firebase reducer with formReducer
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  form: formReducer
});

// Firebase config
const config = getConfig();

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(config, { userProfile: 'users' }),
  applyMiddleware(thunk)
)(createStore);

const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } };

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
