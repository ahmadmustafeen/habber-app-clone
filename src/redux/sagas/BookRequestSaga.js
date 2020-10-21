import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  SHOW_MODAL,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

export function* BookRequestSaga({type, payload}) {
  try {
    console.log('BookRequestSaga Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.requestBook, payload),
    );
    const {status, data, message} = response;
    console.log('BookRequestSaga Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FORGOT_PASSWORD_SUCCESS, paylaod: null});
    }

    yield put({type: SHOW_MODAL, paylaod: null});
    yield put({type: FORGOT_PASSWORD_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: FORGOT_PASSWORD_FAILURE, error});
  }
}
