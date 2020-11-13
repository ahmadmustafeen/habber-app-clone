import {Alert} from 'react-native';
import {put, call} from 'redux-saga/effects';
import * as NavigationService from '../../../NavigationService';

import {RestClient} from '_network/RestClient';
import {API_ENDPOINTS} from 'constants/Network';
import {FETCH_AD_SUCCESS, FETCH_AD_FAILURE} from '_redux/actionTypes';
import {AD_SCREEN} from '_constants/Screens';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOKCLUBS,
  FETCH_ENGLISH_BOOKS,
  FETCH_BOOKMARKS,
  FETCH_ADDRESS,
  SKIP_AD,
} from '_redux/actionTypes';
import {HOME} from 'constants/Screens';

export function* splashSaga({type}) {
  try {
    const response = yield call(() => RestClient.get(API_ENDPOINTS.ads));
    yield put({type: FETCH_ENGLISH_BOOKS});
    yield put({type: FETCH_ARABIC_BOOKS});
    yield put({type: FETCH_BOOKCLUBS});
    yield put({type: FETCH_BOOKMARKS});
    const {
      status,
      data: {data: res, message},
    } = response;

    if (!res.length) {
      yield put({type: SKIP_AD});
      yield put({type: FETCH_AD_FAILURE});
    } else {
      yield put({type: FETCH_AD_SUCCESS});
      NavigationService.navigate('Auth', {
        screen: AD_SCREEN,
        params: {res},
      });
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', error);
  }
}
