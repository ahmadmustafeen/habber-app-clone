import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { startAction, stopAction } from '_redux/actions';

import {
    FETCH_BANNER_FAILURE,
    FETCH_BANNER_SUCCESS,
} from '_redux/actionTypes';
export function* Carasoul({ type }) {
    try {
        yield put(startAction(type));
        const response = yield call(() => RestClient.get(API_ENDPOINTS.banners));
        const { status, data, message } = response;
        if (status !== 200) {
            yield put({ type: FETCH_BANNER_FAILURE });
            return;
        }
        yield put({ type: FETCH_BANNER_SUCCESS, payload: data.data });
    } catch (error) {
        yield put({ type: FETCH_BANNER_FAILURE, error });
    } finally {
        yield put(stopAction(type));
    }
}
