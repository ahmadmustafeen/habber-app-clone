import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { startAction, stopAction } from '_redux/actions';

import {
    FETCH_GENRE_FAILURE,
    FETCH_GENRE_SUCCESS,
} from '_redux/actionTypes';
export function* FilterSaga({ type }) {
    try {
        yield put(startAction(type));
        const response = yield call(() => RestClient.get(API_ENDPOINTS.genre));
        const { status, data, message } = response;
        if (status !== 200) {
            yield put({ type: FETCH_GENRE_FAILURE });
            return;
        }
        yield put({ type: FETCH_GENRE_SUCCESS, payload: data.data });
    } catch (error) {
        yield put({ type: FETCH_GENRE_FAILURE, error });
    } finally {
        yield put(stopAction(type));
    }
}
