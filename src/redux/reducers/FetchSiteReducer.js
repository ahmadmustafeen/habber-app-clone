import { FETCH_SITE_DETAILS_SUCCESS } from 'redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SITE_DETAILS_SUCCESS: {
            return action.payload;
        }
        default:
            return state;
    }
};
