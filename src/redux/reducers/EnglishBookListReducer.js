import {FETCH_ENGLISH_BOOKS_SUCCESS} from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ENGLISH_BOOKS_SUCCESS: {
      console.log('action', action);
      return [action.payload];
    }

    default:
      return state;
  }
};
