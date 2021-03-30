import {
  POST_TO_FAVOURITE,
  FETCH_USER_CART_SUCCESS,
  UPDATE_FAVOURITE,
} from '_redux/actionTypes';
import { FETCH_USER_FAVOURITE_SUCCESS } from '../actionTypes';
const initialState = {
  book: [],
  bookmark: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FAVOURITE: {
      const alreadyAvailable = state[payload.product_type].findIndex(
        (obj) => obj.product_id === payload.product_id,
      );
      if (alreadyAvailable === -1) {
        return {
          ...state,
          [payload.product_type]: [...state[payload.product_type], payload],
        };
      } else {
        const updatedState = { ...state };
        updatedState[payload.product_type].splice(alreadyAvailable, 1);
        return updatedState;
      }
    }

    case FETCH_USER_FAVOURITE_SUCCESS: {
      if (payload === null) {
        return {
          book: [],
          bookmark: [],
        }
      }
      payload.data.map(item => { return state[item.product_type].push(item) })
      return state



      // return { ...state, ...payload.data };
    }
    default:
      return state;
  }
};
