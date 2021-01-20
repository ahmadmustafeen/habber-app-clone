import { I18nManager } from 'react-native';
import { put, call } from 'redux-saga/effects';
import { SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE } from '_redux/actionTypes';
import i18n from 'utils/i18n';
import * as NavigationService from '../../../NavigationService';
import { SIGNIN_SCREEN } from '_constants/Screens';
import { setItem, getItem } from '_helpers/Localstorage';
import { FETCH_ADDRESS, SWITCH_CURRENCY_FAILURE, SWITCH_CURRENCY_SUCCESS } from '../actionTypes';
import { RestClient } from '../../network/RestClient';
import { API_ENDPOINTS } from '../../constants/Network';

export function* SwitchCurrencySaga({ payload }) {
    try {
        let userProfile = yield getItem('@userProfile');
        userProfile = JSON.parse(userProfile);
        const form_data = new FormData();
        if (userProfile.token) {
            form_data.append('first_name', userProfile.first_name);
            form_data.append('last_name', userProfile.last_name);
            form_data.append('phone', userProfile.phone);
            form_data.append('language_id', userProfile.language.id);
            form_data.append('currency_id', payload.currency.id);
            const response = yield call(() =>
                RestClient.post(API_ENDPOINTS.user, form_data),
            )
            // console.log("THIS IS THE RESPONSE", response)
            if (response.status === 200) {
                yield put({ type: FETCH_ADDRESS })
            }
        }
        console.log(payload.currency.id, "SCS");


        yield setItem('@userProfile', JSON.stringify(payload));
        yield put({
            type: SWITCH_CURRENCY_SUCCESS,
            payload,
        });

        // yield put({ type: FETCH_ADDRESS });
    } catch (error) {
        yield put({ type: SWITCH_CURRENCY_FAILURE, error });
    }
}
