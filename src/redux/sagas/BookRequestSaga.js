import {put, call} from 'redux-saga/effects';
import {NETWORK_ERROR, SHOW_NETWORK_MODAL} from 'redux/actionTypes';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {REQUEST_BOOK_SUCCESS, REQUEST_BOOK_FAILURE} from '_redux/actionTypes';

export function* BookRequestSaga({type, payload}) {
  try {
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.requestBook, payload),
    );
    console.log('RESPOIBDE', response);
    if (response.problem === NETWORK_ERROR) {
      return yield put({type: SHOW_NETWORK_MODAL});
    }

    console.log('BookRequestSaga Saga Response . . . .  .', response);
    if (!response.data.success) {
      return yield put({type: REQUEST_BOOK_FAILURE});
    }

    const {status, data, message} = response;
    yield put({type: REQUEST_BOOK_SUCCESS, payload: null});
  } catch (error) {
    yield put({type: REQUEST_BOOK_FAILURE, error});
  }
}
