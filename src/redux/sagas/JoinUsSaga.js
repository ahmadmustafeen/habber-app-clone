import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  SUBMIT_JOIN_US_FAILURE,
  SUBMIT_JOIN_US_SUCCESS,
} from '_redux/actionTypes';

export function* JoinUsSaga({type, payload}) {
  try {
    console.log('JoinUsSaga  . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.joinus, payload),
    );
    const {
      data: {data: res, message, status},
    } = response;
    console.log('JoinUsSaga  Response . . . .  .', response);

    yield put({type: SUBMIT_JOIN_US_SUCCESS, payload: null});
  } catch (error) {
    yield put({type: SUBMIT_JOIN_US_FAILURE, error});
  }
}
