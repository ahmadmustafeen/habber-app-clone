import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { ADD_NEW_ADDRESS } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { EDIT_ADDRESS_FAILURE, EDIT_ADDRESS_SUCCESS, FETCH_ADDRESS } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
export function* EditAddressSaga({ payload }) {
    try {
        console.log('Edit Address Saga . . . .  .1', payload);
        const response = yield call(() =>
            RestClient.put(API_ENDPOINTS.addresses + "/" + payload.id, payload),
        );
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const { status, data, message } = response;
        console.log('Edit Address Saga Response . . . .  .', response);
        console.log("DAFRADasd", data)
        if (data.success) {
            yield put({ type: EDIT_ADDRESS_SUCCESS, });
            yield put({ type: FETCH_ADDRESS }),
                Alert.alert('Successfully Edited Address', message, [
                    {
                        onPress: () =>
                            NavigationService.navigate('MyProfile', { screen: ADD_NEW_ADDRESS, params: { data } }),
                    },
                ]);
        }
    } catch (error) {
        yield put(errorAction(EDIT_ADDRESS_FAILURE, error));
    }
}
