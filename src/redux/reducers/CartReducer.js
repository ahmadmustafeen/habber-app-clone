import { ADD_TO_CART } from '_redux/actionTypes';
const initialState = { totalAmount: 0, items: {} }
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            // var flag = false
            const isbn = action.payload.isbn;
            // const price = action.payload.price;
            // const quantity = action.payload.quantity;
            // const description = action.payload.description;
            // const title = action.payload.title;
            // const image = action.payload.image;
            // const typeOfItem = action.payload.typeOfItem;
            // const author_name = action.payload.author_name;



            let updatedOrNewCartItem = {};
            if (state.items[addedProduct.isbn]) {
                // already have the item in the cart
                updatedOrNewCartItem = {
                    quantity: state.items[addedProduct.id].quantity + 1,
                    sum: state.items[addedProduct.id].sum + prodPrice,
                };
            } else {
                updatedOrNewCartItem = {
                    quantity: 1,
                    productPrice: prodPrice,
                    productTitle: prodTitle,
                    sum: prodPrice,

                };
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.isbn]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice,
            };

            // state.product.map(data => {
            //     if (data.isbn === isbn) {
            //         let arr = state.product.filter(data => data.isbn !== isbn)
            //         state.product = [...arr, { isbn: data.isbn, quantity, price, description, image, title, typeOfItem, total_price = price*quantity }]
            //         flag = true
            //     }
            // })
            // !flag && (state.product = [...state.product, { isbn, quantity, price, description, image, title, typeOfItem }])
            //             const item = state.product.filter(data => data.isbn === isbn)
            //             if (!item.length) {
            //                 return { ...state, product: [...state.product, { isbn, quantity, price, description, image, title, typeOfItem }] }
            //             }
            // state.product.indexOf()
            //             state.total_amount += total
            //             console.log(state)
            return state
        }
        default:
            return state;
    }
};
