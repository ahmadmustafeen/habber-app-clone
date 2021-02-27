import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { ADD_NEW_ADDRESS } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { EDIT_ADDRESS_FAILURE, EDIT_ADDRESS_SUCCESS, FETCH_ADDRESS } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { startAction, stopAction } from '../actions';
import { I18nManager } from 'react-native';
import { Platform } from 'react-native';
import { MY_ADDRESS_BOOK, MY_PROFILE } from '../../constants/Screens';
export function* EditAddressSaga({ type, payload }) {
    try {
        yield put(startAction(type));
        const response = yield call(() =>
            RestClient.put(API_ENDPOINTS.addresses + "/" + payload.id, payload),
        );
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const { status, data, message } = response;
        if (data.success) {
            yield put({ type: EDIT_ADDRESS_SUCCESS, });
            yield put({ type: FETCH_ADDRESS })
            const text = I18nManager.isRTL ? "عنوان تم تعديله بنجاح" : 'Successfully Edited Address'
            Platform.OS === 'ios' ?
                Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', onPress: () => NavigationService.navigate(MY_ADDRESS_BOOK) }])
                : (
                    I18nManager.isRTL ?
                        Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate(MY_ADDRESS_BOOK) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }, { onPress: () => NavigationService.navigate(MY_ADDRESS_BOOK) }])
                        : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', onPress: () => NavigationService.navigate(MY_ADDRESS_BOOK) }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null, onPress: () => NavigationService.navigate(MY_ADDRESS_BOOK) }, { onPress: () => NavigationService.navigate('MyProfile', { screen: MY_PROFILE }) }]
                        )
                )


            // NavigationService.navigate('MyProfile', { screen: MY_PROFILE })






        }
    } catch (error) {
        yield put(errorAction(EDIT_ADDRESS_FAILURE, error));
    } finally {
        yield put(stopAction(type));
    }
}
