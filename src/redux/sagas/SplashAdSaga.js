import { Alert } from 'react-native';

import * as NavigationService from '../../../NavigationService';
import { SIGNIN_SCREEN, LANGUAGE_SCREEN, HOME } from '_constants/Screens';
import { getItem, setItem } from 'helpers/Localstorage';
import {
  FETCH_ADDRESS,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_CART,
  FETCH_USER_FAVOURITE,
  FETCH_ORDER,
  FETCH_CURRENCIES,
  FETCH_USER_PROFILE
} from '_redux/actionTypes';
import { all, put, select } from 'redux-saga/effects';
import { RestClient } from 'network/RestClient';
import { FETCH_ORDER_SUCCESS } from '../actionTypes';

export function* splashAdSaga() {
  try {
    const backUser = yield getItem('@backUser');
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    yield put({
      type: FETCH_USER_PROFILE_SUCCESS,
      payload: userProfile,
    });
    if (userProfile && userProfile.token) {
      RestClient.setHeader('Authorization', `Bearer ${userProfile.token}`);

      yield all([
        put({ type: FETCH_USER_PROFILE }),
        put({ type: FETCH_ADDRESS }),
        put({ type: FETCH_USER_CART }),
        put({ type: FETCH_USER_FAVOURITE }),
        put({ type: FETCH_ORDER }),
      ]);

      return NavigationService.navigate('Drawer', {
        screen: HOME,
      });
    } else if (backUser) {
      const { UserProfileReducer } = yield select(({ UserProfileReducer }) => {
        return { UserProfileReducer };
      });

      return NavigationService.navigate('Auth', {
        screen: SIGNIN_SCREEN,
      });
    } else {
      if (!userProfile.currency) {
        yield setItem(
          '@userProfile',
          JSON.stringify({
            ...userProfile,
            currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
          }),
        );
      }
      return NavigationService.navigate('Auth', {
        screen: LANGUAGE_SCREEN,
      });
    }
  } catch (error) {
    console.log('ERROR SPLASH AD SAGA', error);
    Alert.alert('Error', error);
  }
}
