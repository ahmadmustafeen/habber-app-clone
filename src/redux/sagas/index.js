import {takeLatest, all} from 'redux-saga/effects';
import {SIGN_UP} from '../actionTypes';
import {signupSaga} from './SignupSaga';

function* actionWatcher() {
  yield takeLatest(SIGN_UP, signupSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
