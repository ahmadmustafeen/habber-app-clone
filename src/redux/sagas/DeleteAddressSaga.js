import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { errorAction } from '_redux/actions';
import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { ADD_NEW_ADDRESS } from '_constants/Screens';
import { NETWORK_ERROR, SHOW_NETWORK_MODAL } from 'redux/actionTypes';
import { EDIT_ADDRESS_FAILURE, EDIT_ADDRESS_SUCCESS, FETCH_ADDRESS } from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import { DELETE_ADDRESS_SUCCESS } from '../actionTypes';
import { I18nManager } from 'react-native';
import { Platform } from 'react-native';
export function* DeleteAddressSaga({ payload }) {
    try {
        const response = yield call(() =>
            RestClient.delete(API_ENDPOINTS.addresses + "/" + payload.item.id),
        );
        if (response.problem === NETWORK_ERROR) {
            return yield put({ type: SHOW_NETWORK_MODAL });
        }
        const { status, data, message } = response;
        if (data.status) {
            yield put({ type: FETCH_ADDRESS }),

                yield put({ type: DELETE_ADDRESS_SUCCESS });




            const text = I18nManager.isRTL ? "تم حذف العنوان بنجاح" : 'Successfully Deleted Address'
            Platform.OS === 'ios' ?
                Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', }])
                : (
                    I18nManager.isRTL ?
                        Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null },])
                        : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
                        )
                )


        }
    } catch (error) {
        yield put(errorAction(EDIT_ADDRESS_FAILURE, error));
    }
}
