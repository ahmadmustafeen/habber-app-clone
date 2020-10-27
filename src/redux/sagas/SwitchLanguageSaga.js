import {I18nManager} from 'react-native';
import {put, call} from 'redux-saga/effects';
import {SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE} from '_redux/actionTypes';
import i18n from 'utils/i18n';
import * as NavigationService from '../../../NavigationService';
import {SIGNIN_SCREEN} from '_constants/Screens';
import {setItem, getItem} from '_helpers/Localstorage';
import RNRestart from 'react-native-restart';

export function* switchLangSaga({type, payload}) {
  try {
    // console.log('A', i18n.language, I18nManager);
    yield i18n.changeLanguage(payload);
    yield I18nManager.forceRTL(payload == 'ar');

    let backUser = yield getItem('@backUser');
    // console.log(backUser);
    if (!backUser) {
      yield setItem('@backUser', 'true');
      RNRestart.Restart();
    } else NavigationService.navigate(SIGNIN_SCREEN);

    // console.log('B', i18n.language, I18nManager);
    yield put({type: SWITCH_LANG_SUCCESS, payload: i18n.language});
  } catch (error) {
    yield put({type: SWITCH_LANG_FAILURE, error});
  }
}
