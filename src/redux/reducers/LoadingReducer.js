import {SIGN_IN_SUCCESS, SIGN_IN, SIGN_IN_FAILURE} from '_redux/actionTypes';

const initialState = {
  loading: false,
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

    default:
      return state;
  }
};
