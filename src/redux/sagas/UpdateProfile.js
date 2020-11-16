import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native'
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
    SHOW_MODAL,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_SUCCESS,
} from '_redux/actionTypes';
import { MY_PROFILE } from '_constants/Screens';
import * as NavigationService from '../../../NavigationService';
export function* UpdateProfileSaga({ type, payload }) {
    try {
        console.log('UpdateProfile Saga . . . .  .1', payload);
        const response = yield call(() =>
            RestClient.put(API_ENDPOINTS.users + payload[1], payload[0]),
        );
        const { status, data, message } = response;
        console.log(response)
        if (status === 200) {
            yield put({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
            Alert.alert('Successfully Updated', message, [{
                onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
            }])
            console.log('UpdateProfileSagaSaga Saga Response . . . .  .', response);

            // yield put({type: SHOW_MODAL, payload: null});
            // yield put({type: UPDATE_PASSWORD_SUCCESS, payload: null});
        }
    } catch (error) {
        yield put({ type: UPDATE_PASSWORD_FAILURE, error });
    }
}
