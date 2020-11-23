import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';

import {
  FETCH_ENGLISH_BOOKS_FAILURE,
  FETCH_ENGLISH_BOOKS_SUCCESS,
} from '_redux/actionTypes';
import {startAction, stopAction} from '_redux/actions';

export function* EnglishBookListSaga({type}) {
  try {
    yield put(startAction(type));

    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksEnglish),
    );
    const {status, data: res, message} = response;
    console.log('ENGBookList Saga Response . . . .  .', res);
    if (status !== 200) {
      yield put({type: FETCH_ENGLISH_BOOKS_FAILURE});
    } else {
      yield put({type: FETCH_ENGLISH_BOOKS_SUCCESS, payload: res.data});
    }
  } catch (error) {
    yield put({type: FETCH_ENGLISH_BOOKS_FAILURE, error});
  } finally {
    yield put(stopAction(type));
  }
}
