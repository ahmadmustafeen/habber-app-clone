import { FETCH_COUNTRIES_SUCCESS } from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES_SUCCESS: {
            console.log("FEtch countirs reducer", action.payload);
            return [...action.payload];
            // return [{ ASDASD, ASDASD }]
        }

        default:
            return state;
    }
};
