import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import { ABOUT_US } from '_constants/Screens';

import {
  FETCH_ARABIC_BOOKS_FAILURE,
  FETCH_ARABIC_BOOKS_SUCCESS,
} from '_redux/actionTypes';
export function* ArabicBookListSaga({ type, payload }) {
  try {
    console.log('ARABIC_BOOKS Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksArabic),
    );
    const { status, data, message } = response;
    console.log('ARABIC_BOOKS Saga Response . . . .  .', response);
    if (status !== 200) {
      yield put({ type: FETCH_ARABIC_BOOKS_FAILURE, payload: null });
    }
    else {
      yield put({ type: FETCH_ARABIC_BOOKS_SUCCESS, payload: data });
    }
  } catch (error) {
    yield put({ type: FETCH_ARABIC_BOOKS_FAILURE, error });
  }
}
