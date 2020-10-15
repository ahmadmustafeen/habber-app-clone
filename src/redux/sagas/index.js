import {takeLatest, all} from 'redux-saga/effects';
import {SIGN_IN, SIGN_UP} from '../actionTypes';
import {signupSaga} from './SignupSaga';
import {signinSaga} from './SignInSaga';

function* actionWatcher() {
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_IN,signinSaga );
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
