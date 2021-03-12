import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga'

import { getItem } from '../../helpers/Localstorage';
import { API_ENDPOINTS } from '../../constants/Network';
import { RestClient } from '../../network/RestClient';
import { SHOW_MODAL, SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from '../../redux/actionTypes';

import { startAction, stopAction } from '_redux/actions';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL, SIGN_IN } from '../../redux/actionTypes';
import { Platform } from 'react-native';
import { I18nManager } from 'react-native';
export function* signupSaga({ payload, type }) {
  try {
    yield put(startAction(SIGN_UP));
    console.log('SIgnUp Saga . . . .  .1', payload);
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, {
        ...payload,
        language_id: userProfile.language.iso === 'ar' ? 1 : 2,
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
      // yield put({ payload: payload, type: SIGN_IN, });

    } else {
      // Alert.alert('Registration Failed', data.message);
      const text = I18nManager.isRTL ? 'هذا البريد الإلكتروني مأخوذ بالفعل! جرب واحدة أخرى...' : 'This email has already been taken! try another one...'
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null, }, {}]
            )
        )

      yield put({ type: SIGN_UP_FAILURE });
    }
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
  }
  finally {

    // yield put(
    //   delay(1000)
    // )
    yield put(
      stopAction(SIGN_UP)


    );
  }
}
