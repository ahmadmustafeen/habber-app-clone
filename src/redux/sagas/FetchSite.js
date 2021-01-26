import { put, call } from 'redux-saga/effects';

import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  FETCH_SITE_DETAILS_FAILURE,
  FETCH_SITE_DETAILS_SUCCESS,
} from '_redux/actionTypes';

export function* FetchSiteDetails() {
  try {
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.site_setting),
    );
    const { status, data, message } = response;
    if (status === 200) {
      yield put({ type: FETCH_SITE_DETAILS_SUCCESS, payload: data.data });
    }

    // yield put({ type: FETCH_RELATED_BOOKS_SUCCESS, payload: null });
  } catch (error) {
    yield put(errorAction(FETCH_SITE_DETAILS_FAILURE, error));
  }
}
