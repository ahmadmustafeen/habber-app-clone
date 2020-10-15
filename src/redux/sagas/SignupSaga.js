import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {put, call} from 'redux-saga/effects';
import {SHOW_MODAL, SIGN_UP_FAILURE} from 'redux/actionTypes';

export function* signupSaga({type, payload}) {
  try {
    console.log('SIgnUp Saga . . . .  .1', payload);
    const data = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, payload),
    );
    console.log('SIgnUp Saga . . . .  .', data);
    yield put({type: SHOW_MODAL, paylaod: null});
  } catch (error) {
    yield put({type: SIGN_UP_FAILURE, error});
  }
}
