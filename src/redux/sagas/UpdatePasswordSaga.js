import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  SHOW_MODAL,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

export function* UpdatePasswordSaga({type, payload}) {
  try {
    console.log('UpdatePasswordSaga Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.updatepassword, payload),
    );
    const {status, data, message} = response;
    if (status === 200) {
      yield put({type: UPDATE_PASSWORD_SUCCESS, paylaod: null});
    }
    console.log('UpdatePasswordSagaSaga Saga Response . . . .  .', data);
    // yield put({type: SHOW_MODAL, paylaod: null});
    yield put({type: UPDATE_PASSWORD_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: UPDATE_PASSWORD_FAILURE, error});
  }
}
