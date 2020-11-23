import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  FETCH_USER_FAVOURITE_SUCCESS,
  FETCH_USER_FAVOURITE_FAILURE,
} from '_redux/actionTypes';
import { startAction, stopAction } from '_redux/actions';

export function* FetchFavouriteSaga({ type }) {
  try {
    yield put(startAction(type));
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.favourites),
    );
    const { status, data, message } = response;
    console.log('Fetch Favourite Saga Response . . . .  .', response);
    if (status !== 200) {
      yield put({ type: FETCH_USER_FAVOURITE_FAILURE });
    } else {
      yield put({ type: FETCH_USER_FAVOURITE_SUCCESS, payload: data });
    }
  } catch (error) {
    yield put({ type: FETCH_USER_FAVOURITE_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
