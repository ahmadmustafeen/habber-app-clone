import { put, call, select } from 'redux-saga/effects';
import { getItem } from '../../helpers/Localstorage';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import { ABOUT_US } from 'constants/Screens';
import {
  FETCH_BOOKMARKS_FAILURE,
  FETCH_BOOKMARKS_SUCCESS,
} from '_redux/actionTypes';
export function* BookmarksSaga({ type, payload }) {
  try {
    // const UserProfileReducer = yield select(
    //   ({ UserProfileReducer }) => UserProfileReducer,
    // );
    let UserProfileReducer = yield getItem('@userProfile');
    UserProfileReducer = JSON.parse(UserProfileReducer)
    const response = yield call(() => RestClient.get(API_ENDPOINTS.bookmarks));
    const { status, data, message } = response;
    const updatePrice = data.data.map((item) => ({
      ...item,
      price: item.prices.find(
        (price) => price.iso === UserProfileReducer.currency.iso,
      ).price,
    }));
    if (status !== 200) {
      yield put({ type: FETCH_BOOKMARKS_FAILURE, error });
    } else {
      yield put({ type: FETCH_BOOKMARKS_SUCCESS, payload: updatePrice });
    }
  } catch (error) {
    yield put({ type: FETCH_BOOKMARKS_FAILURE, error });
  }
}
