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

    form_data.append("first_name", "bye");
    form_data.append("last_name", "hi");
    form_data.append("phone", "11111111");
    form_data.append("profile_pic", payload.profile_pic);
    form_data.append("language_id", 1);
    form_data.append("currency_id", 2);

    yield fetch('http://habber.attribes.com/api/v1/user', {
      method: 'put',
      headers: {
        'Content-Type': 'application/form-data',
        'Authorization': `Bearer ${payload.token}`,
        'Accept': 'application/json',

      },
      body: form_data
    })
      .then((res) => console.log("RES", res))
      .catch(err => console.log("ERROR", err));

    // const response = yield call(() =>
    //   data_form.post(API_ENDPOINTS.updatepassword, formdata),
    // );




  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  }
}
