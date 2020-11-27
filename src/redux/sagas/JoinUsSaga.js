import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SUBMIT_JOIN_US_FAILURE,
  SUBMIT_JOIN_US_SUCCESS,
  SHOW_MODAL
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* JoinUsSaga({ type, payload }) {
  try {
    console.log('JoinUsSaga  . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.joinus, payload),
    );
    const {
      data, res, message, status,
    } = response;
    console.log("response", response)
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    console.log('JoinUsSaga  Response . . . .  .', response);
    if (status !== 200) {
      yield put({ type: SUBMIT_JOIN_US_FAILURE, error });
    }
    else {
      yield put({ type: SUBMIT_JOIN_US_SUCCESS });
      yield put({ type: SHOW_MODAL, payload: null });
    }
  } catch (error) {
    console.log(error)
    yield put({ type: SUBMIT_JOIN_US_FAILURE, error });
  }
}
