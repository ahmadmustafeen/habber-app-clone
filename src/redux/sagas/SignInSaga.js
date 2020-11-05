import {Alert} from 'react-native';
import {put, call} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from '_redux/actionTypes';

export function* signinSaga({type, payload}) {
  try {
    console.log('SIgnIp Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, payload),
    );
    const {
      status,
      data: {data: res, message, status: login_status},
    } = response;
    console.log('SIgnIp Saga Response . . . .  .', response);

    if (login_status) {
      RestClient.setHeader('Authorization', `Bearer ${res.token}`);
      Alert.alert('Login Successful', message);
      yield put({type: SIGN_IN_SUCCESS, paylaod: res});
    } else {
      Alert.alert('Login Failed', message);
      yield put({type: SIGN_IN_FAILURE, paylaod: null});
    }
  } catch (error) {
    yield put({type: SIGN_IN_FAILURE, error});
  }
}
