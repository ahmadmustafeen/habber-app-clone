import {put, call} from 'redux-saga/effects';

import {errorAction} from '_redux/actions';
import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  FETCH_RELATED_BOOKS_FAILURE,
  FETCH_RELATED_BOOKS_SUCCESS,
} from '_redux/actionTypes';

export function* RelatedBooksSaga({type, payload}) {
  try {
    console.log('Related Books Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.get(`${API_ENDPOINTS.relatedBooks}/{payload.id}`),
    );
    const {status, data, message} = response;
    console.log('Related Books Saga Response . . . .  .', response);
    if (status === 200) {
      yield put({type: FETCH_RELATED_BOOKS_SUCCESS, paylaod: null});
    }

    yield put({type: FETCH_RELATED_BOOKS_SUCCESS, paylaod: null});
  } catch (error) {
    yield put(errorAction(FETCH_RELATED_BOOKS_FAILURE, error));
  }
}
