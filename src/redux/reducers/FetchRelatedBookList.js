import { FETCH_RELATED_BOOKS_SUCCESS } from 'redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RELATED_BOOKS_SUCCESS: {
            return action.payload;
        }
        default:
            return state;
    }
};
