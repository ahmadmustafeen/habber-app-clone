import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';

import { getItem } from '../../helpers/Localstorage';
import { API_ENDPOINTS } from '../../constants/Network';
import { RestClient } from '../../network/RestClient';
import { SHOW_MODAL, SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../../redux/actionTypes';

import { startAction, stopAction } from '_redux/actions';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL, SIGN_IN } from '../../redux/actionTypes';
export function* signupSaga({ payload, type }) {
  try {
    yield put(startAction(SIGN_UP));
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
    console.log(response);
    if (status === 200) {
      yield put({ type: SHOW_MODAL });
      yield put({ type: SIGN_UP_SUCCESS });
      yield put({ payload: payload, type: SIGN_IN, });

    } else {
      Alert.alert('Registration Failed', data.message);
      yield put({ type: SIGN_UP_FAILURE });
    }
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
  }
  finally {

    yield put(stopAction(SIGN_UP));
  }
}
