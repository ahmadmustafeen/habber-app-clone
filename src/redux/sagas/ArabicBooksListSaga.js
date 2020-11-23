import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  FETCH_ARABIC_BOOKS_FAILURE,
  FETCH_ARABIC_BOOKS_SUCCESS,
} from '_redux/actionTypes';
import {startAction, stopAction} from '_redux/actions';

export function* ArabicBookListSaga({type}) {
  try {
    yield put(startAction(type));
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksArabic),
    );
    const {status, data, message} = response;
    console.log('ARABIC_BOOKS Saga Response . . . .  .', response);
    if (status !== 200) {
      yield put({type: FETCH_ARABIC_BOOKS_FAILURE});
    } else {
      yield put({type: FETCH_ARABIC_BOOKS_SUCCESS, payload: data});
    }
  } catch (error) {
    yield put({type: FETCH_ARABIC_BOOKS_FAILURE, error});
  } finally {
    yield put(stopAction(type));
  }
}
