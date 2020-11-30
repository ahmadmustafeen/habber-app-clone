import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import * as NavigationService from '../../../NavigationService';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { RestClient } from '_network/RestClient';
import { API_ENDPOINTS } from 'constants/Network';
import { FETCH_AD_SUCCESS, FETCH_AD_FAILURE } from '_redux/actionTypes';
import { AD_SCREEN } from '_constants/Screens';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOKCLUBS,
  FETCH_ENGLISH_BOOKS,
  FETCH_BOOKMARKS,
  FETCH_ADDRESS,
  SKIP_AD,
  FETCH_SITE_DETAILS,
} from '_redux/actionTypes';


export function* splashSaga() {
  try {
    const response = yield call(() => RestClient.get(API_ENDPOINTS.ads));
    if (response.status === 521) {
      return Alert.alert("SErver os dowm")
    }
    yield put({ type: FETCH_ENGLISH_BOOKS });
    yield put({ type: FETCH_ARABIC_BOOKS });
    yield put({ type: FETCH_BOOKCLUBS });
    yield put({ type: FETCH_BOOKMARKS });
    yield put({ type: FETCH_SITE_DETAILS });

    if (response.problem === NETWORK_ERROR) {
      yield put({ type: SKIP_AD });
      yield put({ type: FETCH_AD_FAILURE });
      yield put({ type: SHOW_NETWORK_MODAL });
      return;
    }
    console.log("splasghasgaerps", response);

    const {
      status,
      data: { data: res, message },
    } = response;
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }

    if (!res.length) {
      yield put({ type: SKIP_AD });
      yield put({ type: FETCH_AD_FAILURE });
    } else {
      yield put({ type: FETCH_AD_SUCCESS });
      NavigationService.navigate('Auth', {
        screen: AD_SCREEN,
        params: { res },
      });
    }
  } catch (error) {
    console.log('SPLASH ERROR: ', error);
  }
}
