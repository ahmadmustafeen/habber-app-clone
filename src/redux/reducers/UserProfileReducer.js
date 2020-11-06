import i18n from 'utils/i18n';
import {SWITCH_LANG_SUCCESS, SIGN_IN_SUCCESS} from '_redux/actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    // case SWITCH_LANG_SUCCESS: {
    //   return {...state, language: action.payload};
    // }
    case SIGN_IN_SUCCESS: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
