import {HIDE_MODAL, SHOW_MODAL} from 'redux/actionTypes';

const initialState = {
  visible: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {visible: true};
    }
    case HIDE_MODAL: {
      return {visible: false};
    }
    default:
      return state;
  }
};
