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
export function* ForgotPasswordSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    console.log('ForgotPassword Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.forgotPassword, { email: payload, base_url: "habber://app" }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;

    if (status === 200) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: null });
    }
    console.log('ForgotPasswordSaga Saga Response . . . .  .', data);
    yield put({ type: SHOW_MODAL, payload: null });
    yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: null });
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
