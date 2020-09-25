/* eslint-disable no-undef */
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {epics} from './epics';
import appReducer from './reducers';
import thunk from 'redux-thunk';
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const logger = createLogger({
  collapsed: true,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(epicMiddleware, logger)),
);

epicMiddleware.run(epics);

export default store;
