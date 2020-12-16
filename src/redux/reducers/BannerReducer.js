import { FETCH_BANNER_SUCCESS } from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BANNER_SUCCESS: {
            return action.payload;
        }
        default:
            return state;
    }
};
