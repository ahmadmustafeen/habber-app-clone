import {
  FETCH_USER_PROFILE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SWITCH_LANG_SUCCESS,
} from '_redux/actionTypes';

const initialState = {
  currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANG_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case SIGN_IN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case SIGN_OUT_SUCCESS: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
