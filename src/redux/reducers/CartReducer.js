import { Alert } from 'react-native';
import {
  ADD_TO_CART,
  FETCH_USER_CART_SUCCESS,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_ORDER_COMPLETE
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
        console.log("STARTS HERE")
        console.log(payload);
        console.log({
          ...state,
          [payload.product_type]: [...state[payload.product_type], payload],
          // total_price: (!!state.total_price) ? state.total_price : (state.total_price + parseFloat(payload.cart_price.toString().replace(',', '')))
          // total_price: state.total_price + parseFloat(payload.cart_price.toString().replace(',', ''))

          total_price:
            // (state.total_price !== 0) ? (
            //   state.book.reduce(
            //     (total_price, book) =>
            //       parseFloat(total_price.toString().replace(',', '')) +
            //       parseFloat(book.cart_price.toString().replace(',', '')),

            //   ),
            //   state.bookmark.reduce(
            //     (total_price, bookmark) =>
            //       parseFloat(total_price.toString().replace(',', '')) +
            //       parseFloat(bookmark.cart_price.toString().replace(',', '')),
            //     0,
            //   ))
            //   :
            (parseFloat(payload.cart_price.toString().replace(',', ''))) + state.total_price
        })
        console.log("CART REDUCERS", parseFloat(payload.cart_price.toString().replace(',', '')))
        console.log("ENDS HERE")

        return {
          ...state,
          [payload.product_type]: [...state[payload.product_type], payload],
          // total_price: (!!state.total_price) ? state.total_price : (state.total_price + parseFloat(payload.cart_price.toString().replace(',', '')))
          // total_price: state.total_price + parseFloat(payload.cart_price.toString().replace(',', ''))

          total_price: state.total_price !== 0 ?
            // (state.total_price !== 0) ? (
            //   state.book.reduce(
            //     (total_price, book) =>
            //       parseFloat(total_price.toString().replace(',', '')) +
            //       parseFloat(book.cart_price.toString().replace(',', '')),

            //   ),
            //   state.bookmark.reduce(
            //     (total_price, bookmark) =>
            //       parseFloat(total_price.toString().replace(',', '')) +
            //       parseFloat(bookmark.cart_price.toString().replace(',', '')),
            //     0,
            //   ))
            //   :
            (parseFloat(payload.cart_price.toString().replace(',', '')) + state.total_price) :
            (parseFloat(payload.cart_price.toString().replace(',', '')))
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
      console.log("updatedState", updatedState,)
      return { ...updatedState };
    }

    case FETCH_USER_CART_SUCCESS: {
      if (payload === null) {
        return initialState
      }
      const mergedBook = state.book.concat(payload.book);
      const distinctBooks = mergedBook.filter(
        (item, i, a) => a.findIndex((t) => t.isbn === item.isbn) === i,
      );
      console.log('distinctBooks. . . ', distinctBooks);
      const mergedBookmark = state.bookmark.concat(payload.bookmark);
      const distinctBookmarks = mergedBookmark.filter(
        (item, i, a) => a.findIndex((t) => t.id === item.id) === i,
      );
      // console.log("DISTINCT BOOK ", distinctBookmarks, distinctBooks)
      let total_price = 0
      distinctBooks.map(item => { total_price += parseFloat(parseFloat(item.cart_price.toString().replace(',', ''))) })
      distinctBookmarks.map(item => { total_price += parseFloat(parseFloat(item.cart_price.toString().replace(',', ''))) })
      console.log(total_price, "DITSKV")
      return {
        book: distinctBooks,
        bookmark: distinctBookmarks,
        // total_price: state.total_price
        total_price: total_price
        // total_price: state.total_price > 0
        //   ? state.total_price + payload.total_price
        //   : payload.total_price,
      };
    }
    case UPDATE_CART_ITEM_ORDER_COMPLETE: {
      // console.log(state, "UPDATE_CART_ITEM_ORDER_COMPLETE")
      return state
    }
    default:
      return state;
  }
};
