import { put, call } from 'redux-saga/effects';
import { startAction, stopAction } from '_redux/actions';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SHOW_MODAL,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { Alert } from 'react-native'
import { I18nManager } from 'react-native';
import { Platform } from 'react-native';
export function* ForgotPasswordSaga({ type, payload }) {
  try {
    yield put(startAction(type));
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.forgotPassword, { email: payload, base_url: "http://line-kw.com/hebr.line-kw.com/public/social_share?redirec_url=ResetPassword" }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    console.log(response)
    const { status, data, message } = response;

    if (status === 200) {
      yield put({ type: FORGOT_PASSWORD_SUCCESS, payload: null });
      yield put({ type: SHOW_MODAL, payload: null });
    }
    else {

      // Alert.alert(I18nManager.isRTL ? "هذا البريد الإلكتروني غير مسجل!" : "This email is not registered!")
      const text = I18nManager.isRTL ? "هذا البريد الإلكتروني غير مسجل!" : "This email is not registered!"
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK' }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : '' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null },])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : '' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
            )
        )
    }
  } catch (error) {
    yield put({ type: FORGOT_PASSWORD_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
