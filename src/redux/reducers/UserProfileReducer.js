import {
  FETCH_USER_PROFILE_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SWITCH_LANG_SUCCESS,
} from '_redux/actionTypes';
import { SWITCH_CURRENCY_SUCCESS } from '../actionTypes';

const initialState = {
  currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
  notification: 1
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANG_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case SWITCH_CURRENCY_SUCCESS: {
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
