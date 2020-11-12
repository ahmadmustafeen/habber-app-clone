import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
    CART_SUCCESS,
    CART_FAILURE,
} from '_redux/actionTypes';

export function* cartSaga({ type, payload }) {
    try {
        console.log('cartSaga  . . . .  .1', payload.data.data);
        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.cart, payload),
        );
        const {
            data: { data: res, message, status },
        } = response;
        console.log('CartSAGA  Response . . . .  .', response);
        if (status === 200) {
            Alert.alert('Success', message);
            yield put({ type: CART_SUCCESS, payload: null });
        }
    } catch (error) {
        yield put({ type: CART_FAILURE, error });
    }
}
