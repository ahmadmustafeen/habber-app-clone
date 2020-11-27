import {FETCH_ADDRESS_SUCCESS} from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESS_SUCCESS: {
      return action.payload.data;
    }
    default:
      return state;
  }
};
