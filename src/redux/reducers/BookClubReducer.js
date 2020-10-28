import {FETCH_BOOKCLUBS_SUCCESS} from '_redux/actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKCLUBS_SUCCESS: {
      return;
    }

    default:
      return state;
  }
};
