import { Alert } from 'react-native';
import { put, call } from 'redux-saga/effects';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { REQUEST_BOOK_SUCCESS, REQUEST_BOOK_FAILURE } from '_redux/actionTypes';
import { HOME } from '../../constants/Screens';

export function* BookRequestSaga({ type, payload }) {
  const form_data = new FormData();
  form_data.append('book_type', payload.book_type);
  form_data.append('title', payload.title);
  form_data.append('author_name', payload.author_name);
  form_data.append('image', payload.image);

  console.log(payload, "request book saga")
  try {
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.requestBook, form_data),
    );
    console.log('RESPOIBDE', response);
    if (response.problem === NETWORK_ERROR) {
      return yield put({ type: SHOW_NETWORK_MODAL });
    }

    console.log('BookRequestSaga Saga Response . . . .  .', response);
    if (!response.data.success) {
      return yield put({ type: REQUEST_BOOK_FAILURE });
    }

    const { status, data, message } = response;
    Alert.alert('Your Request have been Updated', message, [{
      onPress: () => NavigationService.navigate('Home', { screen: HOME })
    }])
    console.log(response, "bookrequestsaga")
    yield put({ type: REQUEST_BOOK_SUCCESS, payload: null });
  } catch (error) {
    yield put({ type: REQUEST_BOOK_FAILURE, error });
  }
}
