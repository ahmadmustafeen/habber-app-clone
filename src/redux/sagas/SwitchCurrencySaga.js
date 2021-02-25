import { I18nManager } from 'react-native';
import { put, call, select } from 'redux-saga/effects';
import { SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE } from '_redux/actionTypes';
import i18n from 'utils/i18n';
import * as NavigationService from '../../../NavigationService';
import { SIGNIN_SCREEN } from '_constants/Screens';
import { setItem, getItem } from '_helpers/Localstorage';
import { FETCH_ADDRESS, FETCH_ADDRESS_SUCCESS, FETCH_ARABIC_BOOKS, FETCH_BANNER, FETCH_BANNER_SUCCESS, FETCH_BOOKCLUBS, FETCH_BOOKCLUBS_SUCCESS, FETCH_BOOKMARKS, FETCH_BOOKMARKS_SUCCESS, FETCH_BOOK_LISTS, FETCH_ENGLISH_BOOKS, FETCH_ENGLISH_BOOKS_SUCCESS, FETCH_USER_PROFILE, RE_ADD_TO_CART, SPLASH_ACTION, SWITCH_CURRENCY_FAILURE, SWITCH_CURRENCY_SUCCESS, UPDATE_CART_ITEM, UPDATE_CART_PRICES, UPDATE_CART_PRICES_OFFLINE } from '../actionTypes';
import { RestClient } from '../../network/RestClient';
import { API_ENDPOINTS } from '../../constants/Network';
import RNRestart from 'react-native-restart';


export function* SwitchCurrencySaga({ payload }) {
    try {
        console.log(payload, "SwitchCurrencySaga")
        const CartReducer = yield select(
            ({ CartReducer }) => CartReducer,
        );
        let userProfile = yield getItem('@userProfile');
        userProfile = JSON.parse(userProfile);
        const form_data = new FormData();
        if (userProfile.token) {
            form_data.append('first_name', userProfile.first_name);
            form_data.append('last_name', userProfile.last_name);
            form_data.append('email', userProfile.email);
            form_data.append('phone', userProfile.phone);
            form_data.append('language_id', userProfile.language.id);
            form_data.append('currency_id', payload.currency.id);
            const response = yield call(() =>
                RestClient.post(API_ENDPOINTS.user, form_data),
            )
            console.log(response, "SwitchCurrencySaga RESPONSE")
            // console.log("THIS IS THE RESPONSE", response)
            if (response.status === 200) {


                yield put({ type: FETCH_ADDRESS });

            }

        }
        yield setItem('@userProfile', JSON.stringify(payload));
        yield put({
            type: SWITCH_CURRENCY_SUCCESS,
            payload,
        });
        // yield put({ type: SPLASH_ACTION })
        // yield put({ type: FETCH_BOOKCLUBS_SUCCESS, payload: [] })
        // yield put({ type: FETCH_ENGLISH_BOOKS_SUCCESS, payload: [] })
        // yield put({ type: FETCH_BOOKMARKS_SUCCESS, payload: [] })
        // yield put({ type: FETCH_BANNER_SUCCESS, payload: [] })
        // yield put({ type: FETCH_ADDRESS_SUCCESS, payload: [] })
        yield put({ type: FETCH_ARABIC_BOOKS })
        yield put({ type: FETCH_ADDRESS })


        yield put({ type: FETCH_BOOKCLUBS })
        yield put({ type: FETCH_ENGLISH_BOOKS })
        yield put({ type: FETCH_BOOKMARKS })
        yield put({ type: FETCH_BANNER })
        yield put({ type: UPDATE_CART_PRICES_OFFLINE, payload: CartReducer })
        // RNRestart.Restart()



    } catch (error) {
        yield put({ type: SWITCH_CURRENCY_FAILURE, error });
    }

}
