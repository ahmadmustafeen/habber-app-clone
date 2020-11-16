import {
  ADD_TO_CART,
  FETCH_USER_CART_SUCCESS,
  UPDATE_CART_ITEM,
} from '_redux/actionTypes';
const initialState = {
  total_price: 0,
  book: [],
  bookmark: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {




    case UPDATE_CART_ITEM: {
      console.log('10', payload);
      let position = state[payload.product_type].findIndex(
        (obj) => obj.isbn === payload.isbn,
      );
      const updatedState = { ...state };
      var previousValue = updatedState[payload.product_type][position].quantity * updatedState[payload.product_type][position].price;
      console.log("PREVAL", updatedState)
      updatedState.total_price = updatedState.total_price - previousValue
      updatedState[payload.product_type][position].quantity = payload.quantity;
      return { ...updatedState };
    }





    case ADD_TO_CART: {
      let alreadyAvailable;
      if (!state[payload.product_type]) {
        alreadyAvailable = -1;
      } else {
        alreadyAvailable = state[payload.product_type].findIndex(
          (obj) => obj.product_id === payload.product_id,
        );
      }
      var item_price = payload.quantity * payload.price;
      if (alreadyAvailable === -1) {
        return {
          ...state,

          total_price: item_price,
          [payload.product_type]: [...state[payload.product_type], payload],

        };
      }
      const updatedState = { ...state };
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
