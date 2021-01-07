import { Alert } from 'react-native';
import { put, call, select } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  DO_PAYMENT,
} from '../actionTypes';
import { errorAction, startAction, stopAction } from '../actions';

export function* CreateOrderSaga({ type, payload }) {


  try {
    yield put(startAction(type));

    const { CartReducer, UserProfileReducer, AddressReducer } = yield select(
      ({ CartReducer, UserProfileReducer, AddressReducer }) => {
        return { CartReducer, UserProfileReducer, AddressReducer };
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
      .map(({ cart_quantity, product_id, product_type, cart_price, price }) => ({
        quantity: cart_quantity,
        product_id,
        product_type,
        price: cart_price, // or product.price, depends on API
      }));
    var Address_VAL = AddressReducer.find((addresss) => addresss.id === payload)
    const shipping_charges = parseFloat(Address_VAL.shipping_charges.split("$")[1]);
    // console.log('PRODUCTS', product);
    const obj = {
      product,
      total_price: CartReducer.total_price + shipping_charges,
      total_quantity: product.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0,
      ),
      address_id: payload,
      currency_id: 1,
      payment_type: 'online',
    };

    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.order, obj),
    );
    // console.log('CREATE ORDER RESPONSE', response);
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const {
      data: { data: res, success },
    } = response;
    if (!success) {
      console.error('Error', response);
      yield put({ type: CREATE_ORDER_FAILURE });
      return;
    }
    console.log("CREATE ORDER SUCCESS RESPONSE :", response)
    yield put({ type: CREATE_ORDER_SUCCESS });
    if (res.navigation) {
      yield put({ type: DO_PAYMENT, payload: { payload: res, order_details: response.data.data } });
    }
  } catch (error) {
    yield put(errorAction(error, CREATE_ORDER_FAILURE));
  } finally {
    yield put(stopAction(type));
  }
}
