import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {put, call} from 'redux-saga/effects';
import {SHOW_MODAL, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from 'redux/actionTypes';

export function* signupSaga({type, payload}) {
  try {
    console.log('SIgnUp Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signup, payload),
    );
    const {status, data, message} = response;
    if (status === 200){
      yield put({type: SIGN_UP_SUCCESS, paylaod: null});
    }
    console.log('SIgnUp Saga . . . .  .', data);
    yield put({type: SHOW_MODAL, paylaod: null});
    yield put({type: SIGN_UP_FAILURE, paylaod: null});
  } catch (error) {
    yield put({type: SIGN_UP_FAILURE, error});
  }
}
