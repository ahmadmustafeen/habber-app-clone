import {put, call} from 'redux-saga/effects';
import hesabeCrypt from 'hesabe-crypt';
import aesjs from 'aes-js';
import {
  FAILURE_URL,
  HSB_ACCESS_CODE,
  HSB_API_VERSION,
  HSB_BASE_URL,
  HSB_MERCHANT_ID,
  IV_CODE,
  RESPONSE_URL,
  SECRET_KEY,
} from 'constants/HesabeConfig';
import {create} from 'apisauce';
import {Linking} from 'react-native';

export function* PaymentSaga() {
  try {
    const key = aesjs.utils.utf8.toBytes(SECRET_KEY);
    const iv = aesjs.utils.utf8.toBytes(IV_CODE);
    const payment = new hesabeCrypt(key, iv);

    let payload = {
      paymentType: 0,
      encrypted: '',
      decrypted: '',
      amount: 10,
      orderReferenceNumber: Math.floor(Date.now() / 1000),
      variable1: '',
      variable2: '',
      variable3: '',
      variable4: '',
      variable5: '',
      merchantCode: HSB_MERCHANT_ID,
      responseUrl: RESPONSE_URL,
      failureUrl: FAILURE_URL,
      version: HSB_API_VERSION,
    };
    const encrypted = payment.encryptAes(JSON.stringify(payload));
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
        .then((res) => payment.decryptAes(res.data))
        .then((data) => JSON.parse(data)),
    );
    const paymentData = result.response.data;
    const paymentUrl = `https://sandbox.hesabe.com/payment?data=${paymentData}`;
    yield Linking.openURL(paymentUrl);
  } catch (error) {
    console.log(error);
  }
}
