import { FETCH_CURRENCIES_SUCCESS } from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_SUCCESS: {
            // console.log("FETCHTEADSD", action.payload);
            return [...action.payload];
            // return [{ ASDASD, ASDASD }]
        }

        default:
            return state;
    }
};
