import {combineReducers} from 'redux';
import LoadingReducer from './LoadingReducer';
import ModalReducer from './ModalReducer';

export default combineReducers({
  ModalReducer,
  LoadingReducer,
});
