import { put, call } from 'redux-saga/effects';
import { getItem } from '../../helpers/Localstorage';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';

import {
  FETCH_ENGLISH_BOOKS_FAILURE,
  FETCH_ENGLISH_BOOKS_SUCCESS,
} from '_redux/actionTypes';
import { startAction, stopAction } from '_redux/actions';

export function* EnglishBookListSaga({ type }) {
  try {

    let userProfile = yield getItem('@userProfile');
    userProfile = JSON.parse(userProfile);
    yield put(startAction(type));

    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksEnglish),
    );
    const { status, data: res, message } = response;
    const updatePrice = res.data.map((item) => ({ ...item, price: item.prices.find((price) => price.iso === userProfile.currency.iso).price }));

    console.log('ENGBookList Saga Response . . . .  .', res);
    if (status !== 200) {
      yield put({ type: FETCH_ENGLISH_BOOKS_FAILURE });
    } else {
      yield put({ type: FETCH_ENGLISH_BOOKS_SUCCESS, payload: updatePrice });
    }
  } catch (error) {
    yield put({ type: FETCH_ENGLISH_BOOKS_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
