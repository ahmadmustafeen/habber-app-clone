import {Alert} from 'react-native';
import {put, call, select} from 'redux-saga/effects';

import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {NETWORK_ERROR, SHOW_NETWORK_MODAL} from 'redux/actionTypes';
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  DO_PAYMENT,
} from '../actionTypes';
import {errorAction, startAction, stopAction} from '../actions';

export function* CreateOrderSaga({type}) {
  try {
    yield put(startAction(type));
    const payload = {
      address: {
        address_line1: 'asdas',
        address_line2: 'asdas',
        address_name: 'asdas',
        city: 'asdas',
        country: 'Afghanistan',
        id: 2,
        phone: '0023423423423',
        post_code: 'asdas',
        state: 'asdas',
      },
    };
    const {CartReducer, UserProfileReducer, AddressReducer} = yield select(
      ({CartReducer, UserProfileReducer, AddressReducer}) => {
        return {CartReducer, UserProfileReducer, AddressReducer};
      },
    );
    if (!UserProfileReducer.token) {
      Alert.alert('Login Error', 'You must login first to process order');
      return;
    }

    const productCategories = Object.values(CartReducer).filter((key) =>
      Array.isArray(key),
    );
    const product = []
      .concat(...productCategories)
      .map(({cart_quantity, product_id, product_type, cart_price, price}) => ({
        quantity: cart_quantity,
        product_id,
        product_type,
        price: cart_price, // or product.price, depends on API
      }));

    // console.log('PRODUCTS', product);
    const obj = {
      product,
      total_price: CartReducer.total_price,
      total_quantity: product.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0,
      ),
      address_id: payload.address.id,
      currency_id: 1,
      payment_type: 'online',
    };

    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.order, obj),
    );
    // console.log('CREATE ORDER RESPONSE', response);
    if (response.problem === NETWORK_ERROR) {
      return yield put({type: SHOW_NETWORK_MODAL});
    }
    const {
      data: {data: res, success},
    } = response;
    if (!success) {
      console.error('Error', response);
      yield put({type: CREATE_ORDER_FAILURE});
      return;
    }
    yield put({type: CREATE_ORDER_SUCCESS});
    if (res.navigation) {
      yield put({type: DO_PAYMENT, payload: res});
    }
  } catch (error) {
    yield put(errorAction(error, CREATE_ORDER_FAILURE));
  } finally {
    yield put(stopAction(type));
  }
}
