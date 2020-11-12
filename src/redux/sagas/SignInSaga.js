import { HOME } from 'constants/Screens';
import { getItem, setItem } from 'helpers/Localstorage';
import { Alert } from 'react-native';
import { put, call, all } from 'redux-saga/effects';
import { MY_PROFILE } from '_constants/Screens';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { SIGN_IN_FAILURE, SIGN_IN_SUCCESS, HIDE_MODAL } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
export function* signinSaga({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.signin, { email: 'a@b.com', password: '11223344' }),
    );
    const {
      status,
      data: { data: res, message, success },
    } = response;
    if (success) {
      yield setItem('@userProfile', JSON.stringify(res));
      RestClient.setHeader('Authorization', `Bearer ${res.token}`);
      yield all([
        put({ type: SIGN_IN_SUCCESS, payload: res }),
        put({ type: HIDE_MODAL }),
      ]);
      NavigationService.navigate('Drawer', {
        screen: HOME,
      });
    } else {
      Alert.alert('Login Failed', message);
      yield put({ type: SIGN_IN_FAILURE, payload: null });
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  }
}
