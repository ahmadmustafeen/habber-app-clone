import {Alert} from 'react-native';
import {put, call, select, all} from 'redux-saga/effects';
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  FETCH_USER_CART,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {CART_SCREEN} from '_constants/Screens';
import {NETWORK_ERROR, SHOW_NETWORK_MODAL} from 'redux/actionTypes';

export function* CreateOrderSaga({type}) {
  try {
    const payload = {
      product: [
        {
          product_id: 1,
          product_type: 'book',
          price: 3000,
          quantity: 3,
        },
      ],
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

    console.log('PRODUCTS', product);
    const obj = {
      product,
      total_price: CartReducer.total_price,
      total_quantity: 5,
      address_id: payload.address.id,
      currency_id: 1,
      payment_type: 'online',
    };

    console.log('CART', obj);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.order, obj),
    );
    console.log('RESPONSE', response);
    if (response.problem === NETWORK_ERROR) {
      return yield put({type: SHOW_NETWORK_MODAL});
    }
    const {
      data: {data: res, message, status: success},
    } = response;
    if (success) {
      console.log('STATUS', success);
    } else {
      console.error('Error', response);
      yield put({type: ADD_TO_CART_FAILURE});
    }
  } catch (error) {
    yield put({type: ADD_TO_CART_FAILURE, error});
  }
}
