import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';

import { getItem } from '_helpers/Localstorage';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { SHOW_MODAL, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
export function* signupSaga({ payload }) {
  try {
    console.log('SIgnUp Saga . . . .  .1', payload);
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, {
        ...payload,
        language_id: userProfile.language.id,
      }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data } = response;

    if (status === 200) {
      yield put({ type: SIGN_UP_SUCCESS });
      yield put({ type: SHOW_MODAL });
    } else {
      Alert.alert('Registration Failed', data.message);
      yield put({ type: SIGN_UP_FAILURE });
    }
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
  }
}
