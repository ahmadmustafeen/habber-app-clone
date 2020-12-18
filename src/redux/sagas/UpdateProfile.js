import {put, call} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';
import {UPDATE_PASSWORD_FAILURE} from '_redux/actionTypes';

export function* UpdateProfileSaga({type, payload}) {
  try {
    console.log('UpdateProfile Saga . . . .  .1', payload);
    const form_data = new FormData();
    console.log('this is payload data', payload);
    form_data.append('first_name', payload.first_name);
    form_data.append('last_name', payload.last_name);
    form_data.append('phone', payload.phone);
    form_data.append('profile_pic', payload.profile_pic);
    form_data.append('language_id', 1);
    form_data.append('currency_id', 2);
    console.log(form_data, 'this is form data');

    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.user, form_data),
    );
    console.log(response, 'this is response of form data');
  } catch (error) {
    yield put({type: UPDATE_PASSWORD_FAILURE, error});
  }
}
