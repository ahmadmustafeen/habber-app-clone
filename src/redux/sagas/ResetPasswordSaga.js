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
import { getItem } from '../../helpers/Localstorage';
export function* ResetPasswordSaga({ type, payload }) {
    yield put(startAction(RESET_PASSWORD));
    console.log('ResetPassword  . . . .  .1', payload);
    try {
        let userProfile = yield getItem('@userProfile');
        userProfile = JSON.parse(userProfile);

        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.update_password, payload),
        );



        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }

        const {
            data: { data: res, message, status },
        } = response;

        console.log(response, "RESPONSE");

        if (status) {

            yield put({ type: RESET_PASSWORD_SUCCESS, payload: null });
            yield put({ type: SIGN_IN, payload: { email: payload.email, password: payload.password, language_id: userProfile.language.iso === 'ar' ? 1 : 2, } })

            yield put({ type: SHOW_MODAL, payload: null });


        }
        else if (response.data.code === 401) {
            Alert.alert(response.data.message)
        }
    } catch (error) {
        yield put({ type: RESET_PASSWORD_FAILURE, error });
        // Alert.alert(error)
    }
    finally {
        yield put(stopAction(RESET_PASSWORD));
    }
}
