import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';

import { FETCH_STATIC_SUCCESS, FETCH_STATIC_FAILURE } from '../actionTypes';
export function* StaticSaga({ type }) {
    try {
        const response = yield call(() => RestClient.get(API_ENDPOINTS.static_pages));
        // const { status, data, message } = response;
        console.log(API_ENDPOINTS.static_pages)
        console.log('FETCHSTATIC Response . . . .  .', response.data);
        const { data, status } = response;
        if (status !== 200) {
            yield put({ type: FETCH_STATIC_FAILURE, payload: data });
        }
        else {
            console.log(data, "this is thw data")
            yield put({ type: FETCH_STATIC_SUCCESS, payload: data });
        }

        // yield put({ type: FETCH_BOOK_LISTS_SUCCESS, payload: null });
    } catch (error) {
        yield put({ type: FETCH_STATIC_FAILURE, error });
    }
}
