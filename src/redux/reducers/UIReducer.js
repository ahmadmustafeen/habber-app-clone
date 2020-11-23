import {
  REFRESH_ACTION_START,
  START_ACTION,
  STOP_ACTION,
  REFRESH_ACTION_STOP,
} from 'redux/actionTypes';

const initialState = {
  loader: {
    actions: [],
    refreshing: [],
  },
};

const uiReducer = (state = initialState, {type, payload}) => {
  const {loader} = state;
  const {actions, refreshing} = loader;
  switch (type) {
    case START_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: [...actions, payload.action],
        },
      };
    case STOP_ACTION:
      return {
        ...state,
        loader: {
          ...loader,
          actions: actions.filter((action) => action.name !== payload.name),
        },
      };
    case REFRESH_ACTION_START:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: [...refreshing, payload.refreshAction],
        },
      };
    case REFRESH_ACTION_STOP:
      return {
        ...state,
        loader: {
          ...loader,
          refreshing: refreshing.filter(
            (refresh) => refresh !== payload.refreshAction,
          ),
        },
      };
    default:
      return state;
  }
};

export default uiReducer;
