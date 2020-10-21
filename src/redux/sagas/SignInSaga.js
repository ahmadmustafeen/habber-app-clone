import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from '_redux/actionTypes';

export function* signinSaga({type, payload}) {
  try {
    console.log('SIgnIp Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, payload),
    );
    const {
      status,
      data: {data: res},
      message,
    } = response;
    console.log('SIgnIp Saga Response . . . .  .', response);

    if (status === 200) {
      RestClient.setHeader('Authorization', `Bearer ${res.token}`);
      yield put({type: SIGN_IN_SUCCESS, paylaod: null});
    }

    yield put({type: SIGN_IN_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: SIGN_IN_FAILURE, error});
  }
}
