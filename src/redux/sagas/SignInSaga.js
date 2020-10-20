import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {put, call} from 'redux-saga/effects';
import {SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from 'redux/actionTypes';

export function* signinSaga({type, payload}) {
  try {
    console.log('SIgnIp Saga . . . .  .1', payload);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, payload),
    );
    const {status, data, message} = response;
    if (status === 200){
      yield put({type: SIGN_IN_SUCCESS, paylaod: null});
    }
    console.log('SIgnIp Saga Response . . . .  .', data);
  
    yield put({type: SIGN_IN_SUCCESS, paylaod: null});
  } catch (error) {
    yield put({type: SIGN_IN_FAILURE, error});
  }
}
