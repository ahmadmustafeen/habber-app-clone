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
  FETCH_CURRENCIES,
  FETCH_COUNTRIES,
  FETCH_BANNER,
  FETCH_STATIC
} from '_redux/actionTypes';
import { FETCH_GENRE } from '../actionTypes';
import { AD_SCREENS } from '../../constants/Screens';


export function* splashSaga({ payload }) {
  try {
    const response = yield call(() => RestClient.get(API_ENDPOINTS.ads));
    if (response.status === 521) {
      return Alert.alert("Server is down")
    }
    yield put({ type: FETCH_ENGLISH_BOOKS });
    yield put({ type: FETCH_ARABIC_BOOKS });
    yield put({ type: FETCH_BOOKCLUBS });
    yield put({ type: FETCH_BOOKMARKS });
    yield put({ type: FETCH_CURRENCIES });
    yield put({ type: FETCH_COUNTRIES });
    yield put({ type: FETCH_SITE_DETAILS });
    yield put({ type: FETCH_STATIC });
    yield put({ type: FETCH_GENRE });
    yield put({ type: FETCH_BANNER });

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
    console.log("response", !!res)
    if (!res && !payload) {
      yield put({ type: SKIP_AD });
      yield put({ type: FETCH_AD_FAILURE });
    } else {
      yield put({ type: FETCH_AD_SUCCESS, payload: { ad: false, res } });
      yield put({ type: SKIP_AD });


    }
  } catch (error) {
    console.log('SPLASH ERROR: ', error);
  }
}
