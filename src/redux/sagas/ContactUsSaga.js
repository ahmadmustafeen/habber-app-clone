import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {
  SUBMIT_CONTACT_US_FAILURE,
  SUBMIT_CONTACT_US_SUCCESS,
} from '_redux/actionTypes';

export function* contactUsSaga({type, payload}) {
  try {
    console.log('contactUsSaga  . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.contactus, payload),
    );
    const {
      data: {data: res, message, status},
    } = response;
    console.log('contactUsSaga  Response . . . .  .', response);

    yield put({type: SUBMIT_CONTACT_US_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: SUBMIT_CONTACT_US_FAILURE, error});
  }
}
