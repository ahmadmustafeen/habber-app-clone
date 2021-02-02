import { put, call, select, all } from 'redux-saga/effects';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL, GUESTUSER_TOKEN_SUCCESS, GUESTUSER_TOKEN_FAILURE } from 'redux/actionTypes';

export function* GuestUser_token({ type, payload }) {
    try {
        const FCMReducer = yield select((state) => state.FCMReducer);
        console.log('FCM', FCMReducer);
        const response = yield call(() => RestClient.post(API_ENDPOINTS.guestuser_token, FCMReducer));
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const {
            data: { data: res, message, status },
        } = response;

        console.log('guestuser_token  Response . . . .  .', response);
        if (status) {
            yield all([
                put({ type: GUESTUSER_TOKEN_SUCCESS }),
            ]);
        } else {
            console.error('Error', response);
            yield put({ type: GUESTUSER_TOKEN_FAILURE });
        }
    } catch (error) {
        yield put({ type: GUESTUSER_TOKEN_FAILURE, error });
    }
}
