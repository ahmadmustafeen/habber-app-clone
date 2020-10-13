import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {put, call} from 'redux-saga/effects';
import {SHOW_MODAL} from 'redux/actionTypes';

export function* signupSaga({type, payload}) {
  try {
    console.log('SIgnIp Saga . . . .  .1', payload);
    const data = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, payload),
    );
    console.log('SIgnIp Saga Response . . . .  .', data);
    yield put({type: SHOW_MODAL, paylaod: null});
  } catch (error) {
    yield put({type: 'FETCH_FAILED', error});
  }
}
