import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {REQUEST_BOOK_SUCCESS, REQUEST_BOOK_FAILURE} from '_redux/actionTypes';

export function* BookRequestSaga({type, payload}) {
  try {
    console.log('BookRequestSaga Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.requestBook, payload),
    );
    const {status, data, message} = response;
    console.log('BookRequestSaga Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: REQUEST_BOOK_SUCCESS, payload: null});
    }

    yield put({type: REQUEST_BOOK_FAILURE, payload: null});
  } catch (error) {
    yield put({type: REQUEST_BOOK_FAILURE, error});
  }
}
