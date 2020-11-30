import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SUBMIT_CONTACT_US_FAILURE,
  SUBMIT_CONTACT_US_SUCCESS,
  SHOW_MODAL

} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* contactUsSaga({ type, payload }) {
  try {
    console.log('contactUsSaga  . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.contactus, payload),
    );


    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }

    const {
      data: { data: res, message, status },
    } = response;



    if (status) {
      Alert.alert('Success', message);
      yield put({ type: SUBMIT_CONTACT_US_SUCCESS, payload: null });

      yield put({ type: SHOW_MODAL, payload: null });
    }
  } catch (error) {
    yield put({ type: SUBMIT_CONTACT_US_FAILURE, error });
  }
}
