import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import {ABOUT_US} from 'constants/Screens';
import {
  FETCH_BOOKMARKS_FAILURE,
  FETCH_BOOKMARKS_SUCCESS,
} from '_redux/actionTypes';
export function* BookmarksSaga({type, payload}) {
  try {
    console.log('BookmarksSaga Saga . . . .  .1', payload);

    const response = yield call(() => RestClient.get(API_ENDPOINTS.bookmarks));
    const {status, data, message} = response;
    console.log('BookmarksSaga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FETCH_BOOKMARKS_SUCCESS, payload: null});
    }

    yield put({type: FETCH_BOOKMARKS_SUCCESS, payload: null});
  } catch (error) {
    yield put({type: FETCH_BOOKMARKS_FAILURE, error});
  }
}
