import {SET_FCM_TOKEN} from '../actionTypes';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FCM_TOKEN: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
