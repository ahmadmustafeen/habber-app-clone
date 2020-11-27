import {
  HIDE_MODAL,
  SHOW_MODAL,
  SHOW_NETWORK_MODAL,
  HIDE_NETWORK_MODAL,
} from '_redux/actionTypes';

const initialState = {
  visible: false,
  network: false,
  networkStatus: true,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return {...state, visible: true};
    }
    case HIDE_MODAL: {
      return {...state, visible: false};
    }
    case SHOW_NETWORK_MODAL: {
      return {...state, network: true, networkStatus: false};
    }
    case HIDE_NETWORK_MODAL: {
      return {...state, network: false};
    }

    default:
      return state;
  }
};
