import {ADD_TO_CART} from '_redux/actionTypes';
const initialState = {
  totalAmount: 0,
  product: [],
};
// {
//   "product": [
//     {
//       "product_id": 1,
//       "product_type": "book",
//       "price": 3000,
//       "quantity": 3
//     },
//     {
//       "product_id": 2,
//       "product_type": "bookmark",
//       "price": 1900,
//       "quantity": 2
//     }
//   ],
//   "total_price": 2000
// }

// author_name: "Brock Vazquez"
// description: "Cum quia possimus f"
// image: "http://habber.attribes.com/storage/books/4/book1604572263.png"
// price: "596.0000"
// product_id: undefined
// product_type: "book"
// quantity: 3
// title: "Explicabo Ad iste q"
// typeOfItem: "book"

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
    default:
      return state;
  }
};
