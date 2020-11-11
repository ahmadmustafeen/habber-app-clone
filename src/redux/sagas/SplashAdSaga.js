import {Alert} from 'react-native';

import * as NavigationService from '../../../NavigationService';
import {SIGNIN_SCREEN, LANGUAGE_SCREEN, HOME} from '_constants/Screens';
import {getItem} from 'helpers/Localstorage';

export function* splashAdSaga() {
  try {
    const backUser = yield getItem('@backUser');
    const userProfile = yield getItem('@userProfile');
    // if (userProfile) {
    //   return NavigationService.navigate('Drawer', {
    //     screen: HOME,
    //   });
    // } else
    if (backUser) {
      return NavigationService.navigate('Auth', {
        screen: SIGNIN_SCREEN,
      });
    } else {
      return NavigationService.navigate('Auth', {
        screen: LANGUAGE_SCREEN,
      });
    }
  } catch (error) {
    Alert.alert('Error');
  }
}
