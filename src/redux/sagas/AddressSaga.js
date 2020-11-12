import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native'
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { MY_PROFILE } from '_constants/Screens';
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_SUCCESS } from 'redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
export function* addressSaga({ type, payload }) {
    try {
        console.log('Add Address Saga . . . .  .1', payload);
        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.addresses, payload),
        );
        const { status, data, message } = response;
        console.log('Related Books Saga Response . . . .  .', response);
        if (data.success) {
            yield put({ type: ADD_ADDRESS_SUCCESS, payload: payload });
            Alert.alert('Successfully Added new Address', message, [{
                onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
            }])
        }
    } catch (error) {
        yield put(errorAction(ADD_ADDRESS_FAILURE, error));
    }
}
