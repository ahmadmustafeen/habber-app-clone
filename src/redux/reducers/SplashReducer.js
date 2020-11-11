import {
  SIGN_IN_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAILURE,
  FETCH_AD_SUCCESS,
  FETCH_AD_FAILURE,
} from '_redux/actionTypes';

const initialState = {
  splashScreen: true,
  ad: false,
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
      return {...state, splashScreen: false, ad: true};
    }
    case FETCH_AD_FAILURE: {
      return {...state, splashScreen: false};
    }
    default:
      return state;
  }
};
