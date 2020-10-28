import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import {ABOUT_US} from 'constants/Screens';
import {
  FETCH_BOOKCLUBS_FAILURE,
  FETCH_BOOKCLUBS_SUCCESS,
} from '_redux/actionTypes';
export function* BookClubsSaga({type, payload}) {
  try {
    console.log('BookClubsSaga Saga . . . .  .1', payload);

    const response = yield call(() => RestClient.get(API_ENDPOINTS.bookclubs));
    const {status, data, message} = response;
    console.log('BookClubsSaga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FETCH_BOOKCLUBS_SUCCESS, paylaod: null});
    }

    yield put({type: FETCH_BOOKCLUBS_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: FETCH_BOOKCLUBS_FAILURE, error});
  }
}
