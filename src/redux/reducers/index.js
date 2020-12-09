import { combineReducers } from 'redux';
import LoadingReducer from './LoadingReducer';
import ModalReducer from './ModalReducer';
import UserProfileReducer from './UserProfileReducer';
import EnglishBooksReducer from './EnglishBookListReducer';
import ArabicBooksReducer from './ArabicBookListReducer';
import BookmarksReducer from './BookmarksReducer';
import BookClubReducer from './BookClubReducer';
import CartReducer from './CartReducer';
import SearchBooksReducer from './SearchBooksReducer';
import SplashReducer from './SplashReducer';
import FetchRelatedBookList from './FetchRelatedBookList';
import FetchSiteReducer from './FetchSiteReducer';
import FavouriteReducer from './FavouriteReducer';
import AddressReducer from './AddressReducer';
import UIReducer from './UIReducer';
import OrderReducer from './OrderReducer';
import FetchCurrencyReducer from './FetchCurrencyReducer';
import FCMReducer from './FCMReducer';
import FetchCountriesReducer from "./FetchCountriesReducer"
// import FetchFavouriteReducer from "./FetchFavouriteReducer";
export default combineReducers({
  ModalReducer,
  LoadingReducer,
  UserProfileReducer,
  EnglishBooksReducer,
  ArabicBooksReducer,
  BookmarksReducer,
  BookClubReducer,
  CartReducer,
  SearchBooksReducer,
  SplashReducer,
  FetchRelatedBookList,
  FetchSiteReducer,
  FavouriteReducer,
  AddressReducer,
  UIReducer,
  OrderReducer,
  FetchCurrencyReducer,
  FCMReducer,
  // FetchFavouriteReducer,
  FetchCountriesReducer
});
