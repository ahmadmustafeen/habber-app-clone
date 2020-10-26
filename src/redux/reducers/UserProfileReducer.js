import {SWITCH_LANG_SUCCESS} from '_redux/actionTypes';

const initialState = {
  language: 'en',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANG_SUCCESS: {
      return {...state, language: action.payload};
    }

    default:
      return state;
  }
};
