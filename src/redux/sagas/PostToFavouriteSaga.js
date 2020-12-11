import {Alert} from 'react-native';
import {put, call, select, all} from 'redux-saga/effects';
import {
  POST_TO_FAVOURITE_FAILURE,
  POST_TO_FAVOURITE_SUCCESS,
  FETCH_USER_FAVOURITE,
  ADD_TO_FAVOURITE,
} from '_redux/actionTypes';
import * as NavigationService from '../../../NavigationService';
import {API_ENDPOINTS} from '_constants/Network';
import {RestClient} from '_network/RestClient';

import {NETWORK_ERROR, SHOW_NETWORK_MODAL} from 'redux/actionTypes';
import {checkIsFavourite} from '../selectors';
export function* PostToFavouriteSaga({type, payload}) {
  try {
    const {UserProfileReducer, notFavourite} = yield select(
      ({FavouriteReducer, UserProfileReducer}) => {
        return {
          UserProfileReducer,
          notFavourite: checkIsFavourite(FavouriteReducer, payload),
        };
      },
    );
    if (!UserProfileReducer.token) {
      return;
    }
    const response = yield call(() =>
      notFavourite
        ? RestClient.post(API_ENDPOINTS.favourites, payload)
        : RestClient.delete(API_ENDPOINTS.favourites, payload),
    );
    if (response.problem === NETWORK_ERROR) {
      return yield put({type: SHOW_NETWORK_MODAL});
    }
    const {
      data: {data: res, message, status},
    } = response;
    console.log('Favourite Saga Response . . . .  .', response);
    if (status) {
      yield all([
        put({type: FETCH_USER_FAVOURITE}),
        put({type: POST_TO_FAVOURITE_SUCCESS}),
      ]);
    } else {
      console.error('Error', response);
      yield put({type: POST_TO_FAVOURITE_FAILURE});
    }
  } catch (error) {
    yield put({type: POST_TO_FAVOURITE_FAILURE, error});
  }
}
