import {
  ADD_TO_CART,
  FETCH_USER_CART_SUCCESS,
  UPDATE_CART_ITEM,
} from '_redux/actionTypes';
const initialState = {
  book: [],
  bookmark: [],
  total_price: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART_ITEM: {
      console.log('Cart Payload', payload);
      console.log('Cart Reducer', state);
      const alreadyAvailable = state[payload.product_type].findIndex(
        (obj) => obj.product_id === payload.product_id,
      );
      if (alreadyAvailable === -1) {
        if (payload.action === 'sub') {
          return state;
        }
        payload.cart_price = payload.price;
        payload.cart_quantity = payload.quantity;
        console.log('BOOK PRICE', state.book);
        return {
          ...state,
          [payload.product_type]: [...state[payload.product_type], payload],
          total_price:
            state.book.reduce(
              (total, book) =>
                parseFloat(total.toString().replace(',', '')) +
                parseFloat(book.price.toString().replace(',', '')),
              0,
            ) +
            state.bookmark.reduce(
              (total, book) =>
                parseFloat(total.toString().replace(',', '')) +
                parseFloat(book.price.toString().replace(',', '')),
              0,
            ),
        };
      }

      const updatedState = { ...state };
      let product = updatedState[payload.product_type][alreadyAvailable];
      console.log('payload', payload.action);
      if (payload.action === 'add') {
        // console.log(product.cart_quantity, product.quantity, "this")
        (product.cart_quantity < product.quantity) &&
          (product.cart_quantity += 1);
      } else if (payload.action === 'sub') {
        console.log("agya")
        product.cart_quantity > 0 ? (product.cart_quantity -= 1) : null;
      } else if (payload.action === 'remove') {
        updatedState[payload.product_type].splice(alreadyAvailable, 1);
      }

      product.cart_price = payload.price * product.cart_quantity;
      console.log('BOOK PRICE', updatedState.bookmark);
      updatedState.total_price =
        updatedState.book.reduce(
          (total, book) =>
            parseFloat(total.toString().replace(',', '')) +
            parseFloat(book.cart_price.toString().replace(',', '')),
          0,
        ) +
        updatedState.bookmark.reduce(
          (total, book) =>
            parseFloat(total.toString().replace(',', '')) +
            parseFloat(book.cart_price.toString().replace(',', '')),

          0,
        );
      return { ...updatedState };
    }

    // case ADD_TO_CART: {
    //   let alreadyAvailable;
    //   if (!state[payload.product_type]) {
    //     alreadyAvailable = -1;
    //   } else {
    //     alreadyAvailable = state[payload.product_type].findIndex(
    //       (obj) => obj.product_id === payload.product_id,
    //     );
    //   }
    //   var item_price = payload.quantity * payload.price;
    //   if (alreadyAvailable === -1) {
    //     return {
    //       ...state,

    //       total_price: item_price,
    //       [payload.product_type]: [...state[payload.product_type], payload],
    //     };
    //   }
    //   const updatedState = {...state};
    //   if (payload.quantity === 0) {
    //     updatedState[payload.product_type].splice(alreadyAvailable, 1);
    //   } else {
    //     updatedState[payload.product_type][alreadyAvailable].quantity =
    //       payload.quantity;
    //   }
    //   payload.quantity === 0;

    //   return {
    //     ...updatedState,
    //   };
    // }

    case FETCH_USER_CART_SUCCESS: {
      console.log('FETCH_USER_CART_SUCCESS', payload);
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};
