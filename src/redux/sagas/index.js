import { takeLatest, all } from 'redux-saga/effects';
import {
  FORGOT_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  REQUEST_BOOK,
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
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
  UPDATE_PROFILE,
  FETCH_ORDER,
  FETCH_SITE_DETAILS,
  FETCH_USER_FAVOURITE,
  FETCH_CURRENCIES,
  DO_PAYMENT,
  CREATE_ORDER,
  FETCH_COUNTRIES,
  UPDATE_FAVOURITE,
  SWITCH_CURRENCY,
  EDIT_ADDRESS,
  FETCH_BANNER,
  DELETE_ADDRESS,
  FETCH_STATIC
} from '../actionTypes';

import { signupSaga } from './SignupSaga';
import { signinSaga } from './SignInSaga';
import { ForgotPasswordSaga } from './ForgotPasswordSaga';
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
import { PostToFavouriteSaga } from './PostToFavouriteSaga';
import { FetchSiteDetails } from './FetchSite';
import { UpdateProfileSaga } from './UpdateProfile';
import { PaymentSaga } from './PaymentSaga';
import { FetchFavouriteSaga } from './FetchUserFavouriteSaga';
import { FetchCurrencySaga } from './FetchCurrencySaga';
import { BookRequestSaga } from './BookRequestSaga';
import { CreateOrderSaga } from './CreateOrderSaga';
import { FetchCountriesSaga } from './FetchCountriesSaga';
import { FetchOrderSaga } from './FetchOrderSaga';
import { SwitchCurrencySaga } from './SwitchCurrencySaga';
import { EditAddressSaga } from './EditAddressSaga'
import { Carasoul } from './Carasoul'
import { DeleteAddressSaga } from './DeleteAddressSaga'
import { StaticSaga } from './FetchStaticSaga'

function* actionWatcher() {
  yield takeLatest(SPLASH_ACTION, splashSaga);
  yield takeLatest(SKIP_AD, splashAdSaga);
  yield takeLatest(SIGN_UP, signupSaga);
  yield takeLatest(SIGN_IN, signinSaga);
  yield takeLatest(FORGOT_PASSWORD, ForgotPasswordSaga);
  yield takeLatest(REQUEST_BOOK, BookRequestSaga);
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
  yield takeLatest(UPDATE_FAVOURITE, PostToFavouriteSaga);
  yield takeLatest(FETCH_SITE_DETAILS, FetchSiteDetails);
  yield takeLatest(UPDATE_PROFILE, UpdateProfileSaga);
  yield takeLatest(FETCH_USER_FAVOURITE, FetchFavouriteSaga);
  yield takeLatest(FETCH_CURRENCIES, FetchCurrencySaga);
  yield takeLatest(DO_PAYMENT, PaymentSaga);
  yield takeLatest(CREATE_ORDER, CreateOrderSaga);
  yield takeLatest(FETCH_COUNTRIES, FetchCountriesSaga);
  yield takeLatest(SWITCH_CURRENCY, SwitchCurrencySaga);
  yield takeLatest(FETCH_ORDER, FetchOrderSaga);
  yield takeLatest(EDIT_ADDRESS, EditAddressSaga);
  yield takeLatest(FETCH_BANNER, Carasoul);
  yield takeLatest(DELETE_ADDRESS, DeleteAddressSaga);
  yield takeLatest(FETCH_STATIC, StaticSaga)
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
