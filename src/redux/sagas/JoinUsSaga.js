import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SUBMIT_JOIN_US_FAILURE,
  SUBMIT_JOIN_US_SUCCESS,
  SHOW_MODAL
} from '_redux/actionTypes';
import { startAction, stopAction } from '../actions';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { I18nManager } from 'react-native';
export function* JoinUsSaga({ type, payload }) {
  try {
    yield put(startAction(type));

    console.log('JoinUsSaga  . . . .  .1', { ...payload, product_type: (Array.from(payload.product_type).length > 1) ? "both" : Array.from(payload.product_type)[0] });
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.joinus, { ...payload, product_type: (Array.from(payload.product_type).length > 1) ? "both" : Array.from(payload.product_type)[0] }),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const {
      data, res, message, status,
    } = response;
    console.log('JoinUsSaga  Response . . . .  .', response);
    if (status !== 200) {
      Alert.alert(I18nManager.isRTL ? "آسف! هذا البريد الإلكتروني مأخوذ من قبل ، جرب بريدًا آخر ..." : "Sorry! This email is already taken, try another one...");
      yield put({ type: SUBMIT_JOIN_US_FAILURE, error });
    }
    else {
      yield put({ type: SUBMIT_JOIN_US_SUCCESS, response });
      yield put({ type: SHOW_MODAL, payload: null });
    }
  } catch (error) {
    // console.log(error)




    yield put({ type: SUBMIT_JOIN_US_FAILURE, error });
  } finally {
    yield put(stopAction(type));
  }
}
