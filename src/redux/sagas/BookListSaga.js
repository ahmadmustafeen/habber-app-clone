import {put, call} from 'redux-saga/effects';
import {
  FETCH_BOOK_LISTS_FAILURE,
  FETCH_BOOK_LISTS_SUCCESS,
} from '_redux/actionTypes';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';

export function* BookListSaga({type, payload}) {
  try {
    console.log('BookList Saga . . . .  .1', payload);
    const response = yield call(() => RestClient.get(API_ENDPOINTS.booksList));
    const {status, data, message} = response;
    console.log('BookList Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FETCH_BOOK_LISTS_SUCCESS, paylaod: null});
    }

    yield put({type: FETCH_BOOK_LISTS_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: FETCH_BOOK_LISTS_FAILURE, error});
  }
}
