import {takeLatest, all} from 'redux-saga/effects';
import {FORGOT_PASSWORD, SIGN_IN, SIGN_UP} from '../actionTypes';
import {signupSaga} from './SignupSaga';
import {signinSaga} from './SignInSaga';
import { ForgotPasswordSaga } from './ForgotPasswordSaga';

function* actionWatcher() {
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_IN,signinSaga );
  yield takeLatest(FORGOT_PASSWORD, ForgotPasswordSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
