import { HOME } from 'constants/Screens';
import { setItem } from 'helpers/Localstorage';
import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native'
import {
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  HIDE_MODAL,
  FETCH_USER_CART,
  SIGN_Up,
  FETCH_CURRENCIES,
  NETWORK_ERROR,
  SHOW_NETWORK_MODAL,
  FETCH_ADDRESS,
  FETCH_USER_FAVOURITE,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { startAction, stopAction } from '../actions';
import { FETCH_ARABIC_BOOKS, FETCH_BOOKMARKS, FETCH_BOOK_LISTS, FETCH_ENGLISH_BOOKS, FETCH_ORDER, SIGN_IN, UPDATE_CART_PRICES, UPDATE_CART_PRICES_OFFLINE } from '../actionTypes';
import { Platform } from 'react-native';

export function* signinSaga({ payload }) {

  try {
    yield put(startAction(SIGN_IN));
    const { email, password } = payload;
    const FCMReducer = yield select((state) => state.FCMReducer);
    console.log('FCM', FCMReducer);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, {
        email,
        password,
        firebase_token: FCMReducer.token,
      }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const {
      data: { data: res, message, success },
    } = response;
    console.log('user', response);
    if (success) {
      yield setItem('@userProfile', JSON.stringify(res));
      RestClient.setHeader('Authorization', `Bearer ${res.token}`);
      yield all([
        put({ type: UPDATE_CART_PRICES }),
        put({ type: FETCH_ARABIC_BOOKS }),
        put({ type: FETCH_ENGLISH_BOOKS }),
        put({ type: FETCH_BOOKMARKS }),
        put({ type: FETCH_BOOK_LISTS }),
        put({ type: UPDATE_CART_PRICES_OFFLINE }),
        put({ type: SIGN_IN_SUCCESS, payload: res }),
        put({ type: FETCH_ADDRESS }),
        put({ type: FETCH_USER_CART }),
        put({ type: FETCH_USER_FAVOURITE }),
        put({ type: FETCH_CURRENCIES }),
        put({ type: FETCH_ORDER }),
        put({ type: HIDE_MODAL }),
      ]);

      if (!NavigationService.navigate(HOME)) NavigationService.navigate("Drawer", { Screen: HOME })

    } else {

      const text = I18nManager.isRTL ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials'
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK' }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null },])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
            )
        )
      // Alert.alert(
      //   '',
      //   I18nManager.isRTL ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials',
      //   [

      //     { text: I18nManager.isRTL ? 'حسنا' : 'ok' },
      //   ]
      // );
      // Alert.alert((I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Login Failed'), (I18nManager.isRTL ? 'هل؟' : 'ok'), (I18nManager.isRTL ? 'هل؟' : 'ok'));
      yield put({ type: SIGN_IN_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  } finally {
    yield put(stopAction(SIGN_IN));
  }
}
