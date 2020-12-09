import { FETCH_ORDER_SUCCESS } from '_redux/actionTypes';

const initialState = [
];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDER_SUCCESS: {
            // console.log("reducer order", action.payload)
            return [...action.payload];
        }

        default:
            return state;
    }
};
