import {FETCH_BOOK_LISTS_SUCCESS} from '_redux/actionTypes';

const state = {
  
};
export default (state , action) => {
  switch (action.type) {
    case FETCH_BOOK_LISTS_SUCCESS: {
      return ;
    }
   
    default:
      return state;
  }
};
