import {combineReducers} from 'redux';
import LoadingReducer from './LoadingReducer';
import ModalReducer from './ModalReducer';
import UserProfileReducer from './UserProfileReducer';
import EnglishBooksReducer from './EnglishBookListReducer';
import ArabicBooksReducer from './ArabicBookListReducer';

export default combineReducers({
  ModalReducer,
  LoadingReducer,
  UserProfileReducer,
  EnglishBooksReducer,
  ArabicBooksReducer,
});
