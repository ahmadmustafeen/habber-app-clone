import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { startAction, stopAction } from '_redux/actions';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';
import { UPDATE_PASSWORD_FAILURE } from '_redux/actionTypes';
import { FETCH_USER_PROFILE, SIGN_IN_SUCCESS, SPLASH_ACTION, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from '../actionTypes';
import { MY_PROFILE } from '_constants/Screens';

export function* UpdateProfileSaga({ type, payload }) {
  try {
    yield put(startAction(type));
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
    console.log(response, "response")
    const { status, data, message } = response;
    if (status === 200) {
      yield put({ type: SPLASH_ACTION }),
        Alert.alert('Your Profile have been Updated', message, [{
          onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
        }])
    }
    else {
      Alert.alert('Something went wrong', message, [{
        onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
      }])
    }
  } catch (error) {
    Alert.alert(error, [{
      onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
    }])
    yield put({ type: UPDATE_PROFILE_FAILURE, error });
  }
  finally {
    yield put(stopAction(type));
  }
}
