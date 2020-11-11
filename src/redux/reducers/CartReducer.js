import { ADD_TO_CART } from '_redux/actionTypes';
const initialState = {
  totalAmount: 0,
  product: [],
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const alreadyAvailable = state.product.findIndex(
        (obj) => obj.isbn === payload.isbn,
      );
      if (alreadyAvailable === -1) {
        return { ...state, product: [...state.product, payload] };
      }
      const updatedState = { ...state };
      payload.quantity === 0 ? updatedState.product.splice(alreadyAvailable, 1) :
        updatedState.product[alreadyAvailable].quantity = payload.quantity;
      return {
        ...updatedState,
      };
    }
    default:
      return state;
  }
};
