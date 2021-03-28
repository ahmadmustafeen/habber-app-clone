import { HOME, SIGNIN_SCREEN } from 'constants/Screens';
import { getItem, setItem } from 'helpers/Localstorage';
import { Alert } from 'react-native';
import { put } from 'redux-saga/effects';

import { RestClient } from '_network/RestClient';
import { SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { SIGNUP_SCREEN } from '../../constants/Screens';
import { FETCH_ADDRESS_SUCCESS, FETCH_ORDER_SUCCESS, FETCH_USER_CART_SUCCESS, FETCH_USER_FAVOURITE_SUCCESS } from '../actionTypes';
export function* signoutSaga() {
  try {
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    let signedOutUserProfile = { language: userProfile.language, currency: userProfile.currency, notification: true };
    console.log(signedOutUserProfile, "userProfile");

    yield setItem('@userProfile', JSON.stringify(signedOutUserProfile));
    RestClient.setHeader('Authorization', null);
    yield put({ type: SIGN_OUT_SUCCESS, payload: signedOutUserProfile });
    yield put({ type: FETCH_ORDER_SUCCESS, payload: [] });
    yield put({
      type:
        FETCH_USER_FAVOURITE_SUCCESS, payload: null
    });
    yield put({ type: FETCH_USER_CART_SUCCESS, payload: null });
    yield put({ type: FETCH_ADDRESS_SUCCESS, payload: { data: [] } });
    NavigationService.navigate('Auth', { screen: SIGNIN_SCREEN, params: { cleanBack: true } });
  } catch (error) {
    yield put({ type: SIGN_OUT_FAILURE, error });
  }
}
