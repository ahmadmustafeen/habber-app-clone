import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import {ABOUT_US} from 'constants/Screens';
import {
  FETCH_ENGLISH_BOOKS_FAILURE,
  FETCH_ENGLISH_BOOKS_SUCCESS,
} from '_redux/actionTypes';
export function* EnglishBookListSaga({type, payload}) {
  try {
    console.log('ENGBookList Saga . . . .  .1', payload);
    NavigationService.navigate(ABOUT_US);
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksEnglish),
    );
    const {status, data, message} = response;
    console.log('ENGBookList Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FETCH_ENGLISH_BOOKS_SUCCESS, paylaod: null});
    }

    yield put({type: FETCH_ENGLISH_BOOKS_FAILURE, paylaod: null});
  } catch (error) {
    yield put({type: FETCH_ENGLISH_BOOKS_FAILURE, error});
  }
}
