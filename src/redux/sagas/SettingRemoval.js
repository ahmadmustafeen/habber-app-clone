import { HOME, SIGNIN_SCREEN } from 'constants/Screens';
import { getItem, setItem } from 'helpers/Localstorage';
import { Alert } from 'react-native';
import { put } from 'redux-saga/effects';

import { RestClient } from '_network/RestClient';
import { SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { SIGNUP_SCREEN } from '../../constants/Screens';
import { FETCH_ADDRESS_SUCCESS, FETCH_ORDER_SUCCESS, FETCH_USER_CART_SUCCESS } from '../actionTypes';
export function* SettingRemoval() {
    try {
        let userProfile = yield getItem('@userProfile');
        userProfile = JSON.parse(userProfile);
        let signedOutUserProfile = { language: userProfile.language, currency: userProfile.currency };
        console.log(signedOutUserProfile, "userProfile");

        yield setItem('@userProfile', JSON.stringify({ ...userProfile, setting: false }));

    } catch (error) {
        yield put({ type: SIGN_OUT_FAILURE, error });
    }
}
