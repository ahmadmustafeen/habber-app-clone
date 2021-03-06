import { put, call } from 'redux-saga/effects';
import { Alert, I18nManager } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { startAction, stopAction } from '_redux/actions';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';
import { UPDATE_PASSWORD_FAILURE } from '_redux/actionTypes';
import { FETCH_USER_PROFILE, SIGN_IN_SUCCESS, SPLASH_ACTION, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from '../actionTypes';
import { MY_PROFILE } from '_constants/Screens';
import { getItem, setItem } from '../../helpers/Localstorage';

export function* UpdateProfileSaga({ type, payload }) {
  try {

    yield put(startAction(type));
    const form_data = new FormData();
    form_data.append('first_name', payload.first_name);
    form_data.append('last_name', payload.last_name);
    form_data.append('email', payload.email);
    if (payload.profile_pic.uri) (form_data.append('profile_pic', payload.profile_pic));

    form_data.append('language_id', payload.language_id);
    // if (payload.profile_pic === "") {
    form_data.append('flag', payload.flag ? 1 : 0)
    // } else {
    // form_data.append('flag', 0);
    // }
    form_data.append('currency_id', payload.currency_id);
    console.log(form_data)
    const response = yield call(() =>
      RestClient.post(API_ENDPOINTS.user, form_data),
    )
    console.log(response, "response")
    const { status, data, message } = response;
    if (status === 200) {
      let userProfile = yield getItem('@userProfile');
      userProfile = JSON.parse(userProfile);
      yield setItem('@userProfile', JSON.stringify({ ...userProfile, ...response.data.data }));

      yield put({ type: SIGN_IN_SUCCESS, payload: { ...response.data.data } })

      // Alert.alert('Your Profile have been Updated', message, [{
      //   onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
      // }])



      // Alert.alert(
      //   '',
      //   I18nManager.isRTL ? 'بيانات الاعتماد غير صالحة' : 'Your Profile have been Updated',
      //   [

      //     { text: I18nManager.isRTL ? 'حسنا' : 'ok', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) },
      //   ]
      // );

      const text = I18nManager.isRTL ? 'بيانات الاعتماد غير صالحة' : 'Your Profile has been updated'
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null, onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }]
            )
        )



    }
    else {
      const text = I18nManager.isRTL ? 'لا يمكن تحديث ملف التعريف الخاص بك' : 'Your Profile cannot be Updated'
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
            )
        )
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
