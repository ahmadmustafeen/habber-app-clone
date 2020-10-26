import {combineReducers} from 'redux';
import LoadingReducer from './LoadingReducer';
import ModalReducer from './ModalReducer';
import UserProfileReducer from './UserProfileReducer';

export default combineReducers({
  ModalReducer,
  LoadingReducer,
  UserProfileReducer,
});
