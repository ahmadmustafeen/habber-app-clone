import { Alert } from 'react-native';
import { put, call, select, all } from 'redux-saga/effects';
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  FETCH_USER_CART,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { CART_SCREEN } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';

export function* AddToCartSaga({ type, payload }) {
  try {
    const { CartReducer, UserProfileReducer } = yield select(
      ({ CartReducer, UserProfileReducer }) => {
        return { CartReducer, UserProfileReducer };
      },
    );
    if (!UserProfileReducer.token) {
      NavigationService.navigate(CART_SCREEN);
      return;
    }

    const obj = {
      product: CartReducer[payload.product_type],
      total_price: CartReducer.total_price,
    };
    const response = yield call(() => RestClient.post(API_ENDPOINTS.cart, obj));
    const {
      data, status
    } = response;
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    console.log('CartSAGA  Response . . . .  .', response);
    if (status) {
      yield all([
        put({ type: FETCH_USER_CART }),
        put({ type: ADD_TO_CART_SUCCESS }),
      ]);
      NavigationService.navigate(CART_SCREEN);
    } else {
      console.error('Error', response);
      yield put({ type: ADD_TO_CART_FAILURE });
    }
  } catch (error) {
    yield put({ type: ADD_TO_CART_FAILURE, error });
  }
}
