import {
  FETCH_USER_PROFILE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
} from '_redux/actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    // case SWITCH_LANG_SUCCESS: {
    //   return {...state, language: action.payload};
    // }
    case SIGN_IN_SUCCESS: {
      return {...action.payload};
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      return {...action.payload};
    }
    case SIGN_OUT_SUCCESS: {
      return {...action.payload};
    }
    default:
      return state;
  }
};
