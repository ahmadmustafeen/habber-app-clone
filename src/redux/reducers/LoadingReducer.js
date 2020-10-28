import {
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAILURE,
  FETCH_AD_SUCCESS,
  FETCH_AD_FAILURE,
} from '_redux/actionTypes';

const initialState = {
  loading: false,
  splashScreen: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {loading: true};
    }
    case SIGN_IN_SUCCESS: {
      return {loading: false};
    }
    case SIGN_IN_FAILURE: {
      return {loading: false};
    }

    case FETCH_AD_SUCCESS: {
      return {splashScreen: false};
    }
    case FETCH_AD_FAILURE: {
      return {splashScreen: false};
    }
    default:
      return state;
  }
};
