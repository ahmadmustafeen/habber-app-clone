import { put, call } from 'redux-saga/effects';
import { startAction, stopAction } from '_redux/actions';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SHOW_MODAL,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { Alert } from 'react-native'
export function* ForgotPasswordSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    console.log('ForgotPassword Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.forgotPassword, { email: payload, base_url: "habber://" }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;

    console.log('ForgotPasswordSaga Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: null });
      yield put({ type: SHOW_MODAL, payload: null });

    }
    else {

      Alert.alert("This email is not registered!")
    }
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
