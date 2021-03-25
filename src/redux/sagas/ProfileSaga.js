import AsyncStorage from '@react-native-community/async-storage';
import { put, call, select } from 'redux-saga/effects';

import { API_ENDPOINTS } from '_constants/Network';
import { RestClient } from '_network/RestClient';
import { startAction, stopAction } from '_redux/actions';
import { getItem, setItem } from '../../helpers/Localstorage';
import { FETCH_ADDRESS, FETCH_ARABIC_BOOKS, FETCH_BOOKCLUBS, FETCH_BOOKMARKS, FETCH_ENGLISH_BOOKS, FETCH_USER_PROFILE_FAILURE, FETCH_USER_PROFILE_SUCCESS, SIGN_OUT_SUCCESS, UPDATE_CART_PRICES, UPDATE_CART_PRICES_OFFLINE } from '../actionTypes';

export function* ProfileSaga({ type }) {

    const CartReducer = yield select(
        ({ CartReducer }) => CartReducer,
    );
    try {
        yield put(startAction(type));
        const response = yield call(() =>
            RestClient.get(API_ENDPOINTS.profile),
        );
        const { status, data, message } = response;
        console.log('FETCH_PROFLE Saga Response . . . .  .', data.data);
        if (status !== 200) {
            yield put({ type: FETCH_USER_PROFILE_FAILURE });
            // let UserProfileReducer = yield getItem('@userProfile');
            // console.log({ ...(JSON.parse(UserProfileReducer)) }, "{ ...(JSON.parse(UserProfileReducer)) }")
            // yield put({
            //     type: FETCH_USER_PROFILE_SUCCESS,

            //     payload: { ...(JSON.parse(UserProfileReducer)) },
            // });
        } else {
            // const valueString = await AsyncStorage.getItem('@userProfile');
            let UserProfileReducer = yield getItem('@userProfile');


            yield setItem(
                '@userProfile',
                JSON.stringify(

                    // console.log("DATA IN PROFILE SAGA",
                    {
                        ...(JSON.parse(UserProfileReducer)),
                        ...data?.data
                    }
                )
                //     ),
            );
            yield put({
                type: SIGN_OUT_SUCCESS,
            })
            yield put({
                type: FETCH_USER_PROFILE_SUCCESS,
                payload: { ...(JSON.parse(UserProfileReducer)), ...data.data },
            });

            yield put({ type: FETCH_ENGLISH_BOOKS });
            yield put({ type: FETCH_ARABIC_BOOKS });
            yield put({ type: FETCH_BOOKCLUBS });
            yield put({ type: FETCH_BOOKMARKS });
            yield put({ type: FETCH_ADDRESS });

            yield put({ type: UPDATE_CART_PRICES });
            // yield put({ type: UPDATE_CART_PRICES_OFFLINE, payload: CartReducer })

        }
    } catch (error) {
        yield put({ type: FETCH_USER_PROFILE_FAILURE, error });
    } finally {
        yield put(stopAction(type));
    }
}
