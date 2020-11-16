import {
  POST_TO_FAVOURITE,
  FETCH_USER_CART_SUCCESS,
  UPDATE_FAVOURITE,
} from '_redux/actionTypes';
const initialState = {
  book: [],
  bookmark: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_FAVOURITE: {
      let alreadyAvailable;
      if (!state[payload.type]) {
        alreadyAvailable = -1;
      } else {
        alreadyAvailable = state[payload.type].findIndex(
          (obj) => obj.product_id === payload.product_id,
        );
      }
      console.log('Favourite Reducer', alreadyAvailable);
      if (alreadyAvailable === -1) {
        return {
          ...state,
          [payload.type]: [...state[payload.type], payload],
        };
      } else {
        const updatedState = {...state};
        updatedState[payload.type].splice(alreadyAvailable, 1);
        return updatedState;
      }
    }

    case FETCH_USER_CART_SUCCESS: {
      console.log('38', payload);
    }
    default:
      return state;
  }
};
