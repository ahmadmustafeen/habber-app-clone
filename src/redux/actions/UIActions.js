import {
  REFRESH_ACTION_START,
  REFRESH_ACTION_STOP,
  START_ACTION,
  STOP_ACTION,
} from 'redux/actionTypes';

export const startAction = (name, params) => ({
  type: START_ACTION,
  payload: {
    action: {
      name,
      params,
    },
  },
});

export const stopAction = (name) => ({
  type: STOP_ACTION,
  payload: {name},
});

export const refreshActionStart = (refreshAction) => ({
  type: REFRESH_ACTION_START,
  payload: {refreshAction},
});

export const refreshActionStop = (refreshAction) => ({
  type: REFRESH_ACTION_STOP,
  payload: {refreshAction},
});
