import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { FETCH_ADDRESS_FAILURE, FETCH_ADDRESS_SUCCESS } from '_redux/actionTypes';
export function* fetchAddressSaga({ }) {

    console.log('FETCH Address Saga . . . .  .1',);
    try {
        console.log('FETCH Address Saga . . . .  .1',);

        const response = yield call(() =>

            RestClient.get(`${API_ENDPOINTS.fetch_addresses}`),
        );

        const { status, data, res, message } = response;
        console.log('Fetch Address Saga Response . . . .  .', response);
        if (data.status === 200) {
            console.log("RSPONSE", response)
            yield put({ type: FETCH_ADDRESS_FAILURE, payload: response.data });
        }
        else {
            yield put({ type: FETCH_ADDRESS_SUCCESS, payload: response.data });
        }

    } catch (error) {
        yield put({ type: FETCH_ADDRESS_FAILURE, error });
    }
}
