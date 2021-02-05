import { I18nManager } from 'react-native';
import { put, call } from 'redux-saga/effects';
import RNRestart from 'react-native-restart';
import i18n from 'utils/i18n';

import { SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE } from '_redux/actionTypes';
import { setItem, getItem } from '_helpers/Localstorage';

export function* switchLangSaga({ payload }) {
  try {
    console.log("adsdasdasdas", payload);

    yield i18n.changeLanguage(payload.language.iso);
    yield I18nManager.forceRTL(payload.language.iso == 'ar');
    yield setItem('@userProfile', JSON.stringify(payload));
    let backUser = yield getItem('@backUser');
    if (!backUser) {
      yield setItem('@backUser', 'true');
    }
    yield put({
      type: SWITCH_LANG_SUCCESS,
      payload: { language: { iso: i18n.language } },
    });
    RNRestart.Restart();


  } catch (error) {
    yield put({ type: SWITCH_LANG_FAILURE, error });
  }
}
