import { put, call } from 'redux-saga/effects';
import { Alert, I18nManager, Platform } from 'react-native';
import { API_ENDPOINTS } from '_constants/Network';
import { startAction, stopAction } from '_redux/actions';
import { RestClient } from '_network/RestClient';
import * as NavigationService from '../../../NavigationService';
import { UPDATE_PASSWORD_FAILURE } from '_redux/actionTypes';
import { FETCH_USER_PROFILE, SHOW_MODAL, SIGN_IN_SUCCESS, SPLASH_ACTION, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from '../actionTypes';
import { MY_PROFILE } from '_constants/Screens';
import { getItem, setItem } from '../../helpers/Localstorage';
import { HOME } from '../../constants/Screens';

export function* PaymentFailureSaga({ type, payload }) {
    try {
        console.log(payload, "ADASDASD")
        const response = yield call(() =>
            RestClient.post(API_ENDPOINTS.cancel_payment, payload),
        )
        console.log(response, "response")
        const { status, data, message } = response;
        if (status === 200) {
            yield put({ type: SHOW_MODAL, payload: null });
            // NavigationService.navigate(HOME)
            // yield put({ type: SIGN_IN_SUCCESS, payload: { ...response.data.data } })

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

            // const text = I18nManager.isRTL ? 'بيانات الاعتماد غير صالحة' : 'Your Profile have been Updated'
            // Platform.OS === 'ios' ?
            //     Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            //     : (
            //         I18nManager.isRTL ?
            //             Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            //             : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null, onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }]
            //             )
            //     )

            // yield put({ type: SHOW_MODAL })

        }
        else {
            yield put({ type: SHOW_MODAL, payload: null });
            // yield put({ type: SHOW_MODAL, payload: null });
            // const text = I18nManager.isRTL ? 'لا يمكن تحديث ملف التعريف الخاص بك' : 'Your Profile cannot be Updated'
            // Platform.OS === 'ios' ?
            //     Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            //     : (
            //         I18nManager.isRTL ?
            //             Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }])
            //             : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
            //             )
            //     )
        }
    } catch (error) {
        // Alert.alert(error, [{
        //     onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE })
        // }])
        // yield put({ type: SHOW_MODAL, payload: null });
        // yield put({ type: UPDATE_PROFILE_FAILURE, error });
    }
    finally {
        // yield put(stopAction(type));
    }
}
