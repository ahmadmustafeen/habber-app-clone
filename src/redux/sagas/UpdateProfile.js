import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import {
  SHOW_MODAL,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
} from '_redux/actionTypes';

import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { MY_PROFILE } from '_constants/Screens';
import * as NavigationService from '../../../NavigationService';
export function* UpdateProfileSaga({ type, payload }) {
  try {
    console.log('UpdateProfile Saga . . . .  .1', payload);
    const form_data = new FormData();

    form_data.append("first_name", payload.first_name);
    form_data.append("last_name", payload.last_name);
    form_data.append("phone", payload.phone);
    form_data.append("profile_pic", payload.profile_pic.uri);
    form_data.append("language_id", 1);
    form_data.append("currency_id", 2);
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.user, form_data, { headers: { token: payload.token, 'Content-Type': 'multipart/form-data', } }),
    );
    console.log(response, "this is response of form data")




  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  }
}
