import { put, call } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { startAction, stopAction } from '_redux/actions';
import { FETCH_USER_PROFILE_FAILURE, FETCH_USER_PROFILE_SUCCESS } from '../actionTypes';

export function* ProfileSaga({ type }) {
    try {
        yield put(startAction(type));
        const response = yield call(() =>
            RestClient.get(API_ENDPOINTS.profile),
        );
        const { status, data, message } = response;
        console.log('FETCH_PROFLE Saga Response . . . .  .', response, data);
        if (status !== 200) {
            yield put({ type: FETCH_USER_PROFILE_FAILURE });
        } else {

            yield put({
                type: FETCH_USER_PROFILE_SUCCESS,
                payload: data,
            });
        }
    } catch (error) {
        yield put({ type: FETCH_USER_PROFILE_FAILURE, error });
    } finally {
        yield put(stopAction(type));
    }
}
