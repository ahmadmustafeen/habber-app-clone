import {takeLatest, all} from 'redux-saga/effects';
import {
  FORGOT_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  REQUEST_BOOK,
  FETCH_BOOK_LISTS,
  FETCH_RELATED_BOOKS,
  SWITCH_LANG,
  SPLASH_ACTION,
  SKIP_AD,
  FETCH_ENGLISH_BOOKS,
  FETCH_ARABIC_BOOKS,
} from '../actionTypes';
import {signupSaga} from './SignupSaga';
import {signinSaga} from './SignInSaga';
import {ForgotPasswordSaga} from './ForgotPasswordSaga';
import {BookRequestSaga} from './BookRequestSaga';
import {BookListSaga} from './BookListSaga';
import {RelatedBooksSaga} from './RelatedBooksSaga';
import {switchLangSaga} from './SwitchLanguageSaga';
import {splashSaga} from './SplashSaga';
import {splashAdSaga} from './SplashAdSaga';
import {EnglishBookListSaga} from './EnglishBooksListSaga';
import {ArabicBookListSaga} from './ArabicBooksListSaga';

function* actionWatcher() {
  yield takeLatest(SPLASH_ACTION, splashSaga);
  yield takeLatest(SKIP_AD, splashAdSaga);
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_IN, signinSaga);
  yield takeLatest(FORGOT_PASSWORD, ForgotPasswordSaga);
  yield takeLatest(REQUEST_BOOK, BookRequestSaga);
  yield takeLatest(FETCH_BOOK_LISTS, BookListSaga);
  yield takeLatest(FETCH_ENGLISH_BOOKS, EnglishBookListSaga);
  yield takeLatest(FETCH_ARABIC_BOOKS, ArabicBookListSaga);
  yield takeLatest(FETCH_RELATED_BOOKS, RelatedBooksSaga);
  yield takeLatest(SWITCH_LANG, switchLangSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
