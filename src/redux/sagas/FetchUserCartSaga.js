import { put, call, select } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';

import {
  FETCH_USER_CART_FAILURE,
  FETCH_USER_CART_SUCCESS,
} from '_redux/actionTypes';
import { UPDATE_CART_PRICES_OFFLINE } from '../actionTypes';
export function* FetchUserCartSaga() {
  const CartReducer = yield select(
    ({ CartReducer }) => CartReducer,
  );
  try {

    const response = yield call(() => RestClient.get(API_ENDPOINTS.cart));
    const { status, data: res, message } = response;
    if (!res.success) {
      yield put({ type: FETCH_USER_CART_FAILURE });
    } else {
      yield put({ type: FETCH_USER_CART_SUCCESS, payload: res.data });
    }
  } catch (error) {
    yield put({ type: FETCH_USER_CART_FAILURE, error });
  }
  finally {

    // yield put({ type: UPDATE_CART_PRICES_OFFLINE, payload: CartReducer });
  }
}
