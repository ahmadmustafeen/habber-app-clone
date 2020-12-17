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

    // yield fetch('http://habber.attribes.com/api/v1/user', {
    //   method: 'put',
    //   headers: {
    //     'Content-Type': 'application/form-data',
    //     'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGY0Y2ZhZTFlYzU1MTE0MjI2ODNhZjQwMzIxMDA3M2MzMjcyY2JiNThlNjYxZjQ2MjBjZjJlOGFlMGI2ZjQ3Y2RkOWQ4NjliYWNhNzg1NjciLCJpYXQiOjE2MDgwMzc0OTEsIm5iZiI6MTYwODAzNzQ5MSwiZXhwIjoxNjM5NTczNDkxLCJzdWIiOiI5OCIsInNjb3BlcyI6W119.fikz4njeA0vUGgre7oZ-Z6ljYh8vzezrUn0l3bbDplAzJGG3lf2TeUyodkFn8rOyFySWNqpBvqQ3FAdQwB0S1taXANohSMhAw4JTGc9Pi1mnDaV6WnVFOSr2BWkH1O3T-1RwRRYZSqllPHEDiAzf4vxn9ooodBTdNQxU5_agmzDMDltGnuQGboUOQ7eHVQD1nRjQ7EtHu0gcwYYnv1DmhJtkAu_odlpC3rkiyOqnCxIUuIXqTFyuxM9f0DTakgidJVQgfuCI0tpWh7jUTq7y0S2MG7A1wuPj-YWsDdmc2bjfaJ6JmiEnnh9Oul456Ip4odFt6A6mBXLjWm71_PTssrjjgZvb0iAzOyTSIFCSdaF2gGZ9ykG8Uqy2Z0Ychwssq35yHL8cggv24PhyNcZxPbgjLtPDD_qqaClU8Gkbx55KGnwjx0Vdm4smxATt0EPOz3j5RAVmRVlMoC8pzF2FGRdpFBFVb9e5pwVF7jgSQJCyGCUv6pw0M00gg1YRkCYAaL0Gs9Q8jfVcbhFmaNkbLQuHOQ7f5sqNqUC7qJ-1_odABq_mYsk7LahX5vfkRdXiI85GfXqGQ0BkJKE6Fv9dmZ90zns1TFO9F3rndeMQMbuPp7HGAmIrZoTMytplcmWXTQiNWyRfTgNADmixnJdDVwLCuJeF3YPIN08KFiWudPk`,
    //     'Accept': 'application/json',

    //   },
    //   body: form_data
    // })
    //   .then((res) => console.log("RES", res))
    //   .catch(err => console.log("ERROR", err));

    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.user, form_data, { headers: { token: payload.token, 'Content-Type': 'multipart/form-data', } }),
    );
    console.log(response, "this is response of form data")




  } catch (error) {
    yield put({ type: UPDATE_PASSWORD_FAILURE, error });
  }
}
