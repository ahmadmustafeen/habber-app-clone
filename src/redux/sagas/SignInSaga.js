import { HOME } from 'constants/Screens';
import { getItem, setItem } from 'helpers/Localstorage';
import { Alert } from 'react-native';
import { put, call, all, select } from 'redux-saga/effects';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  HIDE_MODAL,
  FETCH_USER_CART,
  FETCH_ORDER_SUCCESS,
  FETCH_CURRENCIES,
  NETWORK_ERROR,
  SHOW_NETWORK_MODAL,
  FETCH_ADDRESS,
  FETCH_USER_FAVOURITE,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { startAction, stopAction } from '../actions';
import { FETCH_ORDER, SIGN_IN } from '../actionTypes';

export function* signinSaga({ payload }) {

  try {
    yield put(startAction(SIGN_IN));
    const { email, password } = payload;
    const FCMReducer = yield select(({ FCMReducer }) => FCMReducer);
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
      status,
      data: { data: res, message, success },
    } = response;
    console.log('user', response);
    if (success) {
      yield setItem('@userProfile', JSON.stringify(res));
      RestClient.setHeader('Authorization', `Bearer ${res.token}`);
      yield all([
        put({ type: SIGN_IN_SUCCESS, payload: res }),
        put({ type: HIDE_MODAL }),
        put({ type: FETCH_ADDRESS }),
        put({ type: FETCH_USER_CART }),
        put({ type: FETCH_USER_FAVOURITE }),
        put({ type: FETCH_CURRENCIES }),
        put({ type: FETCH_ORDER })
      ]);

      NavigationService.navigate('Drawer', {
        screen: HOME,
      });
    } else {
      Alert.alert('Login Failed', message);
      yield put({ type: SIGN_IN_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  }
  finally {

    yield put(stopAction(SIGN_IN));
  }
}
