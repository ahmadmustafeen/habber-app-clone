import { put, call, select } from 'redux-saga/effects';
import { getItem } from '../../helpers/Localstorage';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import RNBootSplash from "react-native-bootsplash";

import {
  FETCH_ENGLISH_BOOKS_FAILURE,
  FETCH_ENGLISH_BOOKS_SUCCESS,
} from '_redux/actionTypes';
import { startAction, stopAction } from '_redux/actions';
import { Alert } from 'react-native';

export function* EnglishBookListSaga({ type }) {

  let UserProfileReducer = yield getItem('@userProfile');
  UserProfileReducer = JSON.parse(UserProfileReducer)
  try {
    yield put(startAction(type));
    // const UserProfileReducer = yield select(
    //   ({ UserProfileReducer }) => UserProfileReducer,
    // );
    const response = yield call(() =>
      RestClient.get(API_ENDPOINTS.booksEnglish),
    );
    const { status, data: res, message } = response;
    setTimeout(() => {
      // Alert.alert("HOPME")
      RNBootSplash.hide({ duration: 3000 })
    }, 2000)
    const updatePrice = res.data.map((item) => ({
      ...item,
      price: item.prices.find(
        (price) => price.iso === UserProfileReducer.currency.iso,
      ).price,
    }));

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
