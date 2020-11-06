import {Alert} from 'react-native';
import {put, delay} from 'redux-saga/effects';

import * as NavigationService from '../../../NavigationService';
import {SIGNIN_SCREEN, LANGUAGE_SCREEN} from '_constants/Screens';
import {getItem} from 'helpers/Localstorage';

export function* splashAdSaga({type}) {
  try {
    let backUser = yield getItem('@backUser');
    NavigationService.navigate('Auth', {
      screen: backUser ? SIGNIN_SCREEN : LANGUAGE_SCREEN,
    });
  } catch (error) {
    Alert.alert('Error');
  }
}
