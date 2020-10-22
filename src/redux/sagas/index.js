import {takeLatest, all} from 'redux-saga/effects';
import {FORGOT_PASSWORD, SIGN_IN, SIGN_UP, REQUEST_BOOK,FETCH_BOOK_LISTS} from '../actionTypes';
import {signupSaga} from './SignupSaga';
import {signinSaga} from './SignInSaga';
import {ForgotPasswordSaga} from './ForgotPasswordSaga';
import {BookRequestSaga} from './BookRequestSaga';
import { BookListSaga } from './BookListSaga';

function* actionWatcher() {
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_IN, signinSaga);
  yield takeLatest(FORGOT_PASSWORD, ForgotPasswordSaga);
  yield takeLatest(REQUEST_BOOK, BookRequestSaga);
  yield takeLatest(FETCH_BOOK_LISTS, BookListSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
