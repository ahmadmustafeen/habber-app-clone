import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {put, call} from 'redux-saga/effects';
import {SHOW_MODAL, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS} from 'redux/actionTypes';

export function* ForgotPasswordSaga({type, payload}) {
  try {
    console.log('ForgotPassword Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.forgotPassword, payload),
    );
    const {status, data, message} = response;
    if (status === 200){
      yield put({type: FORGOT_PASSWORD_SUCCESS, paylaod: null});
    }
    console.log('ForgotPasswordSaga Saga Response . . . .  .', data);
    yield put({type: SHOW_MODAL, paylaod: null});
    yield put({type: FORGOT_PASSWORD_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: FORGOT_PASSWORD_FAILURE, error});
  }
}
