import {put, call} from 'redux-saga/effects';
import hesabeCrypt from 'hesabe-crypt';
import aesjs from 'aes-js';
import {create} from 'apisauce';
import {Alert} from 'react-native';

import * as NavigationService from '../../../NavigationService';
import {PAYMENT_SCREEN} from '../../constants/Screens';
import {NETWORK_ERROR} from '../actionTypes';
import {
  HSB_BASE_URL,
  HSB_ACCESS_CODE,
  HSB_API_VERSION,
  HSB_MERCHANT_ID,
  IV_CODE,
  SECRET_KEY,
} from '../../constants/HesabeConfig';
import {errorAction} from '../actions';

export function* PaymentSaga({payload, type}) {
  try {
    const key = aesjs.utils.utf8.toBytes(SECRET_KEY);
    const iv = aesjs.utils.utf8.toBytes(IV_CODE);
    const payment = new hesabeCrypt(key, iv);
    let payload_obj = {
      paymentType: 0,
      variable1: '',
      variable2: '',
      variable3: '',
      variable4: '',
      variable5: '',
      merchantCode: HSB_MERCHANT_ID,
      version: HSB_API_VERSION,
      currency: payload.currency_iso,
      amount: payload.total_price,
      orderReferenceNumber: payload.id,
      responseUrl: payload.payment_failure_url,
      failureUrl: payload.payment_success_url,
    };
    const encrypted = payment.encryptAes(JSON.stringify(payload_obj));
    const api = create({
      baseURL: HSB_BASE_URL,
      headers: {
        accessCode: HSB_ACCESS_CODE,
        'Content-Type': 'application/json',
      },
    });

    const result = yield call(() =>
      api
        .post('/checkout', {data: encrypted})
        .then((res) => {
          if (res.problem === NETWORK_ERROR) {
            Alert.alert('ERROR', res.problem);
            return;
          }
          return payment.decryptAes(res.data);
        })
        .then((data) => JSON.parse(data))
        .catch((err) => console.log('HESABE ERROR', err)),
    );
    console.log('RESULT', result);
    const paymentData = result.response.data;
    const paymentUrl = `${HSB_BASE_URL}/payment?data=${paymentData}`;
    NavigationService.navigate(PAYMENT_SCREEN, {
      paymentUrl,
    });
  } catch (error) {
    console.log('ERROR AT PAYMENT', error);
    // yield put(errorAction(error, type));
  }
}
