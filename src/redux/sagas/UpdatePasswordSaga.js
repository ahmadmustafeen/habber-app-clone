import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native'
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SHOW_MODAL,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { MY_PROFILE } from '_constants/Screens';
import * as NavigationService from '../../../NavigationService';
import { startAction, stopAction } from '../actions';
import { I18nManager } from 'react-native';
export function* UpdatePasswordSaga({ type, payload }) {
  yield put(startAction(type));
  try {
    console.log('UpdatePasswordSaga Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.updatepassword, payload),
    );


    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;

    console.log(response)
    if (status === 200) {
      yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
      yield put({ type: SHOW_MODAL, payload: null });
      // Alert.alert('Successfully Updated', message, [{
      //   onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
      // }])
      // Alert.alert(
      //   '',
      //   I18nManager.isRTL ? 'تم تحديث كلمة المرور الخاصة بك' : 'Your Password have been Updated',
      //   [

      //     { text: I18nManager.isRTL ? 'حسنا' : 'ok', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) },
      //   ]
      // );
      console.log('UpdatePasswordSagaSaga Saga Response . . . .  .', data);

      // yield put({type: SHOW_MODAL, payload: null});
      // yield put({type: UPDATE_PASSWORD_SUCCESS, payload: null});
    }
  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
