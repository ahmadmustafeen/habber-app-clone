import { put, call } from 'redux-saga/effects';
import { startAction, stopAction } from '_redux/actions';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
    PUSH_NOTIFICATION_FUNCTION_FAILURE,
    PUSH_NOTIFICATION_FUNCTION_SUCCESS,
} from '_redux/actionTypes';


import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* notificationSaga({ type, payload }) {
    try {
        console.log('PUSH_NOTIFICATION_FUNCTION_ Saga . . . .  .1', payload);
        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.fcm + "/" + payload.userID, { notification: payload.notification }),
        );
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const { status, data, message } = response;
        console.log(response, "PUSHuserID")
        if (status === 200) {
            yield put({ type: PUSH_NOTIFICATION_FUNCTION_SUCCESS, payload: null });
        }

        yield put({ type: PUSH_NOTIFICATION_FUNCTION_SUCCESS, payload: null });
    } catch (error) {
        yield put({ type: PUSH_NOTIFICATION_FUNCTION_FAILURE, error });
    }
}
