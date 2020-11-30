import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { SEARCH_BOOKS_FAILURE, SEARCH_BOOKS_SUCCESS } from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* SearchBooksSaga({ type, payload }) {
  try {
    console.log('SearchBooksSaga  . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.booksSearch, payload),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const {
      data: { data: res, message },
      status,
    } = response;

    console.log('SearchBooksSaga  Response . . . .  .', res);
    if (status !== 200) {
      yield put({ type: SEARCH_BOOKS_FAILURE, error });
    } else {
      yield put({ type: SEARCH_BOOKS_SUCCESS, payload: res });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: SEARCH_BOOKS_FAILURE, error });
  }
}
