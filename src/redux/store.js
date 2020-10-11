/* eslint-disable no-undef */
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';
import appReducer from './reducers';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const logger = createLogger({
  collapsed: true,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
);

sagaMiddleware.run(rootSaga);

export default store;
