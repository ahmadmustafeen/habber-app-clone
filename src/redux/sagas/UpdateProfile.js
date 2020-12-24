import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { UPDATE_PASSWORD_FAILURE } from '_redux/actionTypes';
import { FETCH_USER_PROFILE } from '../actionTypes';

export function* UpdateProfileSaga({ type, payload }) {
  try {
    const form_data = new FormData();
    form_data.append('first_name', payload.first_name);
    form_data.append('last_name', payload.last_name);
    form_data.append('phone', payload.phone);
    form_data.append('profile_pic', payload.profile_pic);
    form_data.append('language_id', 1);
    form_data.append('currency_id', 2);

    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.user, form_data),
    )
    console.log(response, "update prof respobnse");
    yield put({ type: FETCH_USER_PROFILE });

  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  }
}
