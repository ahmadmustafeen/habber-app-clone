import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';

import {
  FETCH_USER_CART_FAILURE,
  FETCH_USER_CART_SUCCESS,
} from '_redux/actionTypes';
export function* FetchUserCartSaga() {
  try {
    const response = yield call(() => RestClient.get(API_ENDPOINTS.cart));
    const { status, data: res, message } = response;
    console.log('FetchUserCartSaga Saga Response . . . .  .', response);
    if (!res.success) {
      yield put({ type: FETCH_USER_CART_FAILURE });
    } else {
      yield put({ type: FETCH_USER_CART_SUCCESS, payload: res.data });
    }
  } catch (error) {
    yield put({ type: FETCH_USER_CART_FAILURE, error });
  }
}
