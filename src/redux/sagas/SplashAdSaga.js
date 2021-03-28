import { Alert } from 'react-native';

import RNBootSplash from "react-native-bootsplash";
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
import { FETCH_ARABIC_BOOKS, FETCH_BOOKCLUBS, FETCH_BOOKMARKS, FETCH_ENGLISH_BOOKS, FETCH_ORDER_SUCCESS, FETCH_USER_CART_SUCCESS, GUESTUSER_TOKEN, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from '../actionTypes';
import { Platform } from 'react-native';
import CartReducer from '../reducers/CartReducer';
import { I18nManager } from 'react-native';
import i18n from '../../utils/i18n';

export function* splashAdSaga() {

  try {

    const backUser = yield getItem('@backUser');
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    let cartREDUCER = yield getItem('@cartREDUCER');
    cartREDUCER = JSON.parse(cartREDUCER);


    let UserProfileReducer = yield getItem('@userProfile');
    yield put({ type: SIGN_IN_SUCCESS, payload: { ...(JSON.parse(UserProfileReducer)) } })
    console.log(userProfile, "cartREDUCER");
    if (userProfile && !userProfile.currency) {


      const userProfilecheck = (userProfile);
      yield setItem(
        '@userProfile',
        JSON.stringify({
          ...userProfilecheck,
          currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
        }),

      );


      yield put({ type: FETCH_ENGLISH_BOOKS });
      yield put({ type: FETCH_ARABIC_BOOKS });
      yield put({ type: FETCH_BOOKCLUBS });
      yield put({ type: FETCH_BOOKMARKS });
    }
    else if (!userProfile) {


      yield setItem(
        '@userProfile',
        JSON.stringify({
          currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
        }),

      );

      yield put({ type: FETCH_ENGLISH_BOOKS });
      yield put({ type: FETCH_ARABIC_BOOKS });
      yield put({ type: FETCH_BOOKCLUBS });
      yield put({ type: FETCH_BOOKMARKS });
    }
    // yield put({
    //   type: FETCH_USER_PROFILE_SUCCESS,
    //   payload: userProfile,
    // });
    // console.log("userProfileuserProfileuserProfileuserProfile", userProfile, "userProfile");
    if (userProfile && userProfile.token) {


      RestClient.setHeader('Authorization', `Bearer ${userProfile.token}`);


      yield setItem('@cartREDUCER', JSON.stringify(null));

      yield all([
        // put({ type: SIGN_OUT_SUCCESS }),
        put({ type: FETCH_USER_PROFILE }),
        put({ type: FETCH_ADDRESS }),
        put({ type: FETCH_USER_CART }),
        put({ type: FETCH_USER_FAVOURITE }),
        put({ type: FETCH_ORDER }),
      ]);

      // return NavigationService.navigate('Drawer', {
      //   screen: HOME,
      // });
    } else if (userProfile) {


      yield setItem('@adViewed', JSON.stringify(true));
      // yield put({
      //   type: FETCH_USER_PROFILE,
      // });
      yield put({ type: GUESTUSER_TOKEN });
      // const { UserProfileReducer } = yield select(({ UserProfileReducer }) => {
      //   return { UserProfileReducer };
      // });
      // console.log(userProfile, "UserProfileReducerUserProfileReducerUserProfileReducer")
      yield put({
        type: FETCH_USER_CART_SUCCESS, payload: (cartREDUCER ? cartREDUCER : {
          book: [],
          bookmark: [],
          total_price: 0,
        })
      })
      // return NavigationService.navigate('Auth', {
      //   screen: SIGNIN_SCREEN,
      // });
    } else {
      yield put({ type: GUESTUSER_TOKEN });
      // if (!userProfile) {


      //   yield setItem(
      //     '@userProfile',
      //     JSON.stringify({
      //       // ...userProfile,
      //       currency: { id: 1, iso: 'KWD', name: 'Kuwaiti dinar', symbol: 'KD' },
      //       // currency: userProfile.currency,
      //       notification: 1,
      //     }),
      //   );

      //   // return NavigationService.navigate('Auth', {

      //   //   screen: LANGUAGE_SCREEN,
      //   // });
      // }


    }


  } catch (error) {
    console.log('ERROR SPLASH AD SAGA', error);
    Alert.alert('Error', error);
  }
}
