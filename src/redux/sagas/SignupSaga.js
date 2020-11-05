import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {SHOW_MODAL, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from '_redux/actionTypes';

export function* signupSaga({type, payload}) {
  try {
    console.log('SIgnUp Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, payload),
    );
    const {status, data, message} = response;
    if (status === 200) {
      yield put({type: SIGN_UP_SUCCESS, payload: null});
    }
    console.log('SIgnUp Saga . . . .  .', data);
    yield put({type: SHOW_MODAL, payload: null});
    yield put({type: SIGN_UP_FAILURE, payload: null});
  } catch (error) {
    yield put({type: SIGN_UP_FAILURE, error});
  }
}
