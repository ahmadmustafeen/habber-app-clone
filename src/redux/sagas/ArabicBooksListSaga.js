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
    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);

    yield put(startAction(type));
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksArabic),
    );
    const { status, data, message } = response;
    console.log('ARABIC_BOOKS Saga Response . . . .  .', response);
    if (status !== 200) {
      yield put({ type: FETCH_ARABIC_BOOKS_FAILURE });
    } else {
      const updatePrice = data.data.map((item) => ({ ...item, price: item.prices.find((price) => price.iso === userProfile.currency.iso).price }));
      yield put({ type: FETCH_ARABIC_BOOKS_SUCCESS, payload: { data: updatePrice } });
    }
  } catch (error) {
    yield put({ type: FETCH_ARABIC_BOOKS_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
