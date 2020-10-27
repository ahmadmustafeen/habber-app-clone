import {Alert, I18nManager} from 'react-native';
import {put, call} from 'redux-saga/effects';
import {SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE} from '_redux/actionTypes';
import i18n from 'utils/i18n';
import * as NavigationService from '../../../NavigationService';
import {SIGNIN_SCREEN, LANGUAGE_SCREEN} from '_constants/Screens';
import {getItem} from 'helpers/Localstorage';
import {SPLASH_COMPLETE} from '_redux/actionTypes';

export function* splashSaga({type}) {
  try {
    let backUser = yield getItem('@backUser');
    yield put({type: SPLASH_COMPLETE});
    NavigationService.navigate('Auth', {
      screen: backUser ? SIGNIN_SCREEN : LANGUAGE_SCREEN,
    });
  } catch (error) {
    Alert.alert('Error');
  }
}
