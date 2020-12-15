import { I18nManager } from 'react-native';
import { put, call } from 'redux-saga/effects';
import { SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE } from '_redux/actionTypes';
import i18n from 'utils/i18n';
import * as NavigationService from '../../../NavigationService';
import { SIGNIN_SCREEN } from '_constants/Screens';
import { setItem, getItem } from '_helpers/Localstorage';

export function* SwitchCurrencySaga({ payload }) {
    try {
        console.log(payload, "SCS");
        yield setItem('@userProfile', JSON.stringify(payload));
        yield put({
            type: SWITCH_LANG_SUCCESS,
            payload,
        });
    } catch (error) {
        yield put({ type: SWITCH_LANG_FAILURE, error });
    }
}
