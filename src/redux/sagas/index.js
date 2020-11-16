import { takeLatest, all } from 'redux-saga/effects';
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
  FETCH_BOOKMARKS,
  FETCH_BOOKCLUBS,
  UPDATE_PASSWORD,
  SUBMIT_JOIN_US,
  SUBMIT_CONTACT_US,
  SEARCH_BOOKS,
  ADD_ADDRESS_SAGA,
  FETCH_ADDRESS,
  FETCH_USER_CART,
  ADD_TO_CART,
  SIGN_OUT,
  FETCH_SITE_DETAILS,
  UPDATE_PROFILE
} from '../actionTypes';
import { signupSaga } from './SignupSaga';
import { signinSaga } from './SignInSaga';
import { ForgotPasswordSaga } from './ForgotPasswordSaga';
import { BookRequestSaga } from './BookRequestSaga';
import { BookListSaga } from './BookListSaga';
import { RelatedBooksSaga } from './RelatedBooksSaga';
import { switchLangSaga } from './SwitchLanguageSaga';
import { splashSaga } from './SplashSaga';
import { splashAdSaga } from './SplashAdSaga';
import { EnglishBookListSaga } from './EnglishBooksListSaga';
import { ArabicBookListSaga } from './ArabicBooksListSaga';
import { BookmarksSaga } from './BookmarksSaga';
import { BookClubsSaga } from './BookClubsSaga';
import { contactUsSaga } from './ContactUsSaga';
import { JoinUsSaga } from './JoinUsSaga';
import { UpdatePasswordSaga } from './UpdatePasswordSaga';
import { SearchBooksSaga } from './SearchBooksSaga';
import { AddToCartSaga } from './AddToCartSaga';
import { FetchUserCartSaga } from './FetchUserCartSaga';
import { addressSaga } from './AddressSaga';
import { fetchAddressSaga } from './FetchAddressSaga';
import { signoutSaga } from './SignOutSaga';
import { FetchSiteDetails } from './FetchSite';
import { UpdateProfileSaga } from './UpdateProfile'
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
  yield takeLatest(FETCH_BOOKMARKS, BookmarksSaga);
  yield takeLatest(FETCH_BOOKCLUBS, BookClubsSaga);
  yield takeLatest(SUBMIT_CONTACT_US, contactUsSaga);
  yield takeLatest(SUBMIT_JOIN_US, JoinUsSaga);
  yield takeLatest(UPDATE_PASSWORD, UpdatePasswordSaga);
  yield takeLatest(SEARCH_BOOKS, SearchBooksSaga);

  yield takeLatest(ADD_ADDRESS_SAGA, addressSaga);
  yield takeLatest(FETCH_ADDRESS, fetchAddressSaga);
  yield takeLatest(ADD_TO_CART, AddToCartSaga);
  yield takeLatest(FETCH_USER_CART, FetchUserCartSaga);
  yield takeLatest(SIGN_OUT, signoutSaga);
  yield takeLatest(FETCH_SITE_DETAILS, FetchSiteDetails);
  yield takeLatest(UPDATE_PROFILE, UpdateProfileSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
