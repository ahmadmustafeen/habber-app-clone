import { Alert } from 'react-native';
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
      const alreadyAvailable = state[payload.product_type].findIndex(
        (obj) => obj.product_id === payload.product_id,
      );

      if (alreadyAvailable === -1) {
        if (payload.action === 'sub') {
          return state;
        }
        payload.cart_price = payload.price;

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
      if (payload.action === 'add') {
        product.cart_quantity < product.quantity && product.cart_quantity++;
      } else if (payload.action === 'sub') {
        product.cart_quantity > 0 ? (product.cart_quantity -= 1) : null;
      } else if (payload.action === 'remove') {
        updatedState[payload.product_type].splice(alreadyAvailable, 1);
      }

      product.cart_price =
        parseFloat(payload.price.toString().replace(',', '')) *
        product.cart_quantity;
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

    case FETCH_USER_CART_SUCCESS: {
      const mergedBook = state.book.concat(payload.book);
      const distinctBooks = mergedBook.filter(
        (item, i, a) => a.findIndex((t) => t.isbn === item.isbn) === i,
      );
      console.log('distinctBooks. . . ', distinctBooks);
      const mergedBookmark = state.bookmark.concat(payload.bookmark);
      const distinctBookmarks = mergedBookmark.filter(
        (item, i, a) => a.findIndex((t) => t.id === item.id) === i,
      );
      return {
        book: distinctBooks,
        bookmark: distinctBookmarks,
        total_price:
          state.total_price > 0
            ? state.total_price + payload.total_price
            : payload.total_price,
      };
    }
    default:
      return state;
  }
};
