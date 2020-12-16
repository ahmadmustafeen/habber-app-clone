import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { MY_PROFILE } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_SUCCESS, FETCH_ADDRESS } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
export function* addressSaga({ type, payload }) {
  console.log('Add Address Saga . . . .  .1', payload);
  try {
    console.log('Add Address Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.addresses, payload),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }
    const { status, data, message } = response;
    console.log('Addres Saga Response . . . .  .', response);
    if (data.success) {
      yield put({ type: ADD_ADDRESS_SUCCESS, });
      yield put({ type: FETCH_ADDRESS }),
        Alert.alert('Successfully Added new Address', message, [
          {
            onPress: () =>
              NavigationService.navigate('MyProfile', { screen: MY_PROFILE }),
          },
        ]);
    }
  } catch (error) {
    yield put(errorAction(ADD_ADDRESS_FAILURE, error));
  }
}
