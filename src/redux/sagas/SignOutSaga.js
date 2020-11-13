import {HOME, SIGNIN_SCREEN} from 'constants/Screens';
import {getItem, setItem} from 'helpers/Localstorage';
import {Alert} from 'react-native';
import {put} from 'redux-saga/effects';

import {RestClient} from '_network/RestClient';
import {SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
export function* signoutSaga() {
  try {
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    let signedOutUserProfile = {language: userProfile.language};

    yield setItem('@userProfile', JSON.stringify(signedOutUserProfile));
    RestClient.setHeader('Authorization', null);
    yield put({type: SIGN_OUT_SUCCESS, payload: signedOutUserProfile});
    NavigationService.navigate(SIGNIN_SCREEN);
  } catch (error) {
    yield put({type: SIGN_OUT_FAILURE, error});
  }
}
