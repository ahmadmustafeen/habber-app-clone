import { put, call } from 'redux-saga/effects';
import {
    FETCH_BOOK_LISTS_FAILURE,
    FETCH_BOOK_LISTS_SUCCESS,
} from '_redux/actionTypes';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';

import { ABOUT_US } from 'constants/Screens';
import { FETCH_CURRENCIES_FAILURE, FETCH_CURRENCIES_SUCCESS } from '../actionTypes';
export function* FetchCurrencySaga({ type }) {
    try {
        const response = yield call(() => RestClient.get(API_ENDPOINTS.currencies));
        // const { status, data, message } = response;
        // console.log('Currency Saga Response . . . .  .', response);
        const { data: { data }, status } = response;
        console.log("currency", data);
        if (status !== 200) {
            yield put({ type: FETCH_CURRENCIES_FAILURE, payload: data });
        }
        else {
            yield put({ type: FETCH_CURRENCIES_SUCCESS, payload: data });
        }

        // yield put({ type: FETCH_BOOK_LISTS_SUCCESS, payload: null });
    } catch (error) {
        yield put({ type: FETCH_BOOK_LISTS_FAILURE, error });
    }
}
