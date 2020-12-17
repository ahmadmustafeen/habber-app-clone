import { FETCH_STATIC_SUCCESS } from '_redux/actionTypes';

const initialState = [];
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATIC_SUCCESS: {
            console.log(action, "resudecs")
            console.log("FEtch static reducer", action.payload);
            return { ...action.payload };
        }

        default:
            return state;
    }
};
