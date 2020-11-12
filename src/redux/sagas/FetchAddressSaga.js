import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { FETCH_ADDRESS_SUCCESS } from 'redux/actionTypes';
export function* fetchAddressSaga({ type, payload }) {
    try {
        console.log('FETCH Address Saga . . . .  .1', payload);

        const response = yield call(() =>
            RestClient.get(API_ENDPOINTS.fetch_addresses),
        );
        const { status, data, res, message } = response;
        console.log('Fetch Address Saga Response . . . .  .', response);
        if (status !== 200) {
            yield put({ type: FETCH_ADDRESS_SUCCESS });
        }
        else {
            yield put({ type: FETCH_ADDRESS_SUCCESS, payload: response.data });
        }

    } catch (error) {
        yield put({ type: FETCH_ADDRESS_FAILURE, error });
    }
}
