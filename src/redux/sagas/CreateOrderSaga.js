import { Alert } from 'react-native';
import { put, call, select } from 'redux-saga/effects';
import * as NavigationService from '../../../NavigationService';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  DO_PAYMENT,
  FETCH_ORDER,
  FETCH_USER_CART,
  FETCH_USER_CART_SUCCESS,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_ORDER_COMPLETE,
} from '../actionTypes';
import { errorAction, startAction, stopAction } from '../actions';
import { INVOICE } from '../../constants/Screens';
import { getItem } from '../../helpers/Localstorage';
import { bookmarkdata } from '../../assets/data/dummydata';

export function* CreateOrderSaga({ type, payload }) {

  console.log(payload.address);
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
    var Address_VAL = AddressReducer.find((addresss) => addresss.id === payload.address)
    const shipping_charges = parseFloat(Address_VAL.shipping_charges);
    // console.log('PRODUCTS', product);
    const obj = {
      product,
      total_price: CartReducer.total_price + shipping_charges,
      total_quantity: product.reduce(
        (total, currentValue) => total + currentValue.quantity,
        0,
      ),
      address_id: payload.address,
      currency_id: 1,
      payment_type: payload.paymentMethod,
    };
    console.log(obj, "OBJ")
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

    console.log(response, "RESPONSE")
    if (!success) {
      console.error('Error', response);
      Alert.alert("Cannot Create Order", response.data.message)

      yield put({ type: CREATE_ORDER_FAILURE });
      return;
    }
    // console.log("REQUIRED DATA", response.data.status)
    // if (!response.data.status) {
    //   Alert.alert({ title: "Cannot Create Order", message: "Some Product ran out of stock" })
    //   return;
    // }
    console.log("CREATE ORDER SUCCESS RESPONSE :", response)
    yield put({ type: CREATE_ORDER_SUCCESS });
    yield put({ type: FETCH_ORDER });
    // yield put({ type: FETCH_USER_CART });
    yield put({ type: FETCH_USER_CART_SUCCESS, payload: null });
    if (!res.navigation) {
      console.log(response.data.data, "this is somthing inmportant")
      NavigationService.navigate('Invoice', {
        item: response.data.data
      });
    }
    else if (res.navigation) {


      yield put({ type: DO_PAYMENT, payload: { payload: res, order_details: response.data.data } });

    }
  } catch (error) {

    yield put(errorAction(error, CREATE_ORDER_FAILURE));
  } finally {
    // let userProfile = yield getItem('@userProfile');
    // userProfile = JSON.parse(userProfile);
    // RestClient.setHeader('Authorization', `Bearer ${userProfile.token}`);
    // yield put({
    //   type: FETCH_USER_CART
    // });

    yield put(stopAction(type));

  }
}
