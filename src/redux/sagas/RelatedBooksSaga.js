import { put, call } from 'redux-saga/effects';

import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  FETCH_RELATED_BOOKS_FAILURE,
  FETCH_RELATED_BOOKS_SUCCESS,
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* RelatedBooksSaga({ type, payload }) {
  try {
    // console.log('Related Books Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.get(`${API_ENDPOINTS.relatedBooks}/${payload.product_id}`),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;

    console.log('Related Books Saga Response . . . .  .', data.data);
    if (status === 200) {
      yield put({ type: FETCH_RELATED_BOOKS_SUCCESS, payload: data.data });
    }

    // yield put({type: FETCH_RELATED_BOOKS_SUCCESS, payload: null});
  } catch (error) {
    yield put(errorAction(FETCH_RELATED_BOOKS_FAILURE, error));
  }
}
