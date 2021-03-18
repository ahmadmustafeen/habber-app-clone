import { I18nManager } from 'react-native';
import { put, call, select } from 'redux-saga/effects';
import RNRestart from 'react-native-restart';
import i18n from 'utils/i18n';

import { SWITCH_LANG_SUCCESS, SWITCH_LANG_FAILURE } from '_redux/actionTypes';
import { setItem, getItem } from '_helpers/Localstorage';

export function* switchLangSaga({ payload }) {
  let userProfile = yield getItem('@userProfile');
  userProfile = JSON.parse(userProfile);

  let adViewed = yield getItem('@adViewed');
  adViewed = JSON.parse(adViewed);
  console.log(!adViewed, "adViewed")
  // debugger;
  try {
    console.log("adsdasdasdas", payload);
    yield setItem('@userProfile', JSON.stringify({ ...userProfile, language: { iso: i18n.language }, setting: payload.setting }));




    // yield setItem('@setting', JSON.stringify(true));
    const CartReducer = yield select((state) => state.CartReducer);

    const UserProfileReducer = yield select((state) => state.UserProfileReducer);
    console.log(CartReducer, "LANGUAGE CARD REDUCER")
    // debugger;
    if (!UserProfileReducer.token) {
      yield setItem('@cartREDUCER', JSON.stringify(CartReducer));
    }
    let backUser = yield getItem('@backUser');
    if (!backUser) {
      yield setItem('@backUser', 'true');
    }
    yield put({
      type: SWITCH_LANG_SUCCESS,
      payload: { ...userProfile, language: { iso: i18n.language }, setting: true, language_presence: false },
    });
    yield I18nManager.forceRTL(payload.language.iso == 'ar');

    RNRestart.Restart();
    yield i18n.changeLanguage(payload.language.iso);

  } catch (error) {
    yield put({ type: SWITCH_LANG_FAILURE, error });
  }
}
