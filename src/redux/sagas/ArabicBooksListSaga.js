import { put, call, select, all } from 'redux-saga/effects';
import { getItem } from '../../helpers/Localstorage';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  FETCH_ARABIC_BOOKS_FAILURE,
  FETCH_ARABIC_BOOKS_SUCCESS,
} from '_redux/actionTypes';
import { startAction, stopAction } from '_redux/actions';

export function* ArabicBookListSaga({ type }) {
  try {
    yield put(startAction(type));
    const UserProfileReducer = yield select(
      ({ UserProfileReducer }) => UserProfileReducer,
    );
    console.log(UserProfileReducer, "THIS IS UserProfileReducer")
    // let UserProfileReducer = yield getItem('@userProfile');
    // UserProfileReducer = JSON.parse(UserProfileReducer)
    console.log(UserProfileReducer.currency.iso, "USERPRODILE")
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksArabic),
    );
    const { status, data, message } = response;
    if (status !== 200) {
      yield put({ type: FETCH_ARABIC_BOOKS_FAILURE });
    } else {
      const updatePrice = data.data.map((item) => ({
        ...item,
        price: item.prices.find(
          (price) => price.iso === UserProfileReducer.currency.iso,
        ).price,
      }));
      yield put({
        type: FETCH_ARABIC_BOOKS_SUCCESS,
        payload: { data: updatePrice },
      });
    }
  } catch (error) {
    yield put({ type: FETCH_ARABIC_BOOKS_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
