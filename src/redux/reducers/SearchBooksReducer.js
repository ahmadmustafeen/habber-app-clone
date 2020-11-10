import {SEARCH_BOOKS_SUCCESS} from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS_SUCCESS: {
      return [...action.payload];
    }

    default:
      return state;
  }
};
