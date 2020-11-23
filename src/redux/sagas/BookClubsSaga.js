import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {startAction, stopAction} from '_redux/actions';

import {
  FETCH_BOOKCLUBS_FAILURE,
  FETCH_BOOKCLUBS_SUCCESS,
} from '_redux/actionTypes';
export function* BookClubsSaga({type}) {
  try {
    yield put(startAction(type));
    const response = yield call(() => RestClient.get(API_ENDPOINTS.bookclubs));
    const {status, data, message} = response;
    console.log('BookClubsSaga Response . . . .  .', response);
    if (status !== 200) {
      yield put({type: FETCH_BOOKCLUBS_FAILURE});
      return;
    }
    yield put({type: FETCH_BOOKCLUBS_SUCCESS, payload: data.data});
  } catch (error) {
    yield put({type: FETCH_BOOKCLUBS_FAILURE, error});
  } finally {
    yield put(stopAction(type));
  }
}
