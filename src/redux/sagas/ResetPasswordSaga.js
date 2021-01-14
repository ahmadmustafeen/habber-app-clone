import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    SHOW_MODAL

} from '_redux/actionTypes';
import { startAction, stopAction } from '_redux/actions';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL, SIGN_IN } from 'redux/actionTypes';
import { RESET_PASSWORD } from '../../constants/Screens';
export function* ResetPasswordSaga({ type, payload }) {
    try {
        yield put(startAction(type));
        console.log('ResetPassword  . . . .  .1', payload);
        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.update_password, payload),
        );

        console.log(response, "RESET PASSWORD response")

        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }

        const {
            data: { data: res, message, status },
        } = response;

        console.log(status);

        if (status) {
            // Alert.alert('Success', message);
            yield put({ type: RESET_PASSWORD_SUCCESS, payload: null });
            yield put({ type: SIGN_IN, payload: { email: payload.email, password: payload.email } })
        }
    } catch (error) {
        yield put({ type: RESET_PASSWORD_FAILURE, error });
    }
}
