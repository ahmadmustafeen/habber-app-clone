import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';

import { FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_FAILURE } from '../actionTypes';
export function* FetchCountriesSaga({ type }) {
    try {
        const response = yield call(() => RestClient.get(API_ENDPOINTS.countries));
        // const { status, data, message } = response;
        console.log('FETCH_COUNTRIES Response . . . .  .', response);
        const { data: { data }, status } = response;
        if (status !== 200) {
            yield put({ type: FETCH_COUNTRIES_FAILURE, payload: data });
        }
        else {
            yield put({ type: FETCH_COUNTRIES_SUCCESS, payload: data });
        }

        // yield put({ type: FETCH_BOOK_LISTS_SUCCESS, payload: null });
    } catch (error) {
        yield put({ type: FETCH_COUNTRIES_FAILURE, error });
    }
}
