import {ADD_TO_CART, FETCH_USER_CART_SUCCESS} from '_redux/actionTypes';
const initialState = {
  total_price: 0,
  product: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART: {
      let alreadyAvailable;
      if (!state[payload.product_type]) {
        alreadyAvailable = -1;
      } else {
        alreadyAvailable = state[payload.product_type].findIndex(
          (obj) => obj.isbn === payload.isbn,
        );
      }
      console.log('42', alreadyAvailable);
      if (alreadyAvailable === -1) {
        return {
          ...state,
          [payload.product_type]: [payload],
        };
      }
      const updatedState = {...state};
      if (payload.quantity === 0) {
        updatedState[payload.product_type].splice(alreadyAvailable, 1);
      } else {
        updatedState[payload.product_type][alreadyAvailable].quantity =
          payload.quantity;
      }
      payload.quantity === 0;

      return {
        ...updatedState,
      };
    }
    case FETCH_USER_CART_SUCCESS: {
      console.log('38', payload);
    }
    default:
      return state;
  }
};
