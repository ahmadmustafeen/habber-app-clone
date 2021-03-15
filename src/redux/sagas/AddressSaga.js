import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { MY_PROFILE } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_SUCCESS, FETCH_ADDRESS, SHOW_MODAL } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { startAction, stopAction } from '../actions';
import { ADD_NEW_ADDRESS, CHECKOUT, SIGNIN_SCREEN } from '../../constants/Screens';
export function* addressSaga({ type, payload }) {
  yield put(startAction(type));
  try {
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.addresses, payload),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;
    if (data.success) {
      yield put({ type: ADD_ADDRESS_SUCCESS, });
      yield put({ type: FETCH_ADDRESS });
      NavigationService.navigate('AddNewAddress', { screen: ADD_NEW_ADDRESS, payload: { route: true } })
      // yield put({ type: SHOW_MODAL, payload: null });

      // Alert.alert('Successfully Added new Address', message, [
      //   {
      //     onPress: () => {
      //       (payload.checkout) ? NavigationService.navigate('Checkout', { screen: CHECKOUT }) :
      //         NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
      //     }
      //   },
      // ]);
    }
    // else {
    //   Alert.alert('Cannot add new address, Please signin or signup first', message, [
    //     {
    //       onPress: () => {
    //         (payload.checkout) ? NavigationService.navigate('Checkout', { screen: CHECKOUT }) :
    //           NavigationService.navigate('Signin', { screen: SIGNIN_SCREEN })
    //       }
    //     },
    //   ]);
    // }
  } catch (error) {

    yield put(errorAction(ADD_ADDRESS_FAILURE, error));
  } finally {
    yield put(stopAction(type));
  }
}
