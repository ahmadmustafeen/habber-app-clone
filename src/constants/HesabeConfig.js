const PRODUCTION_URL = 'https://api.hesabe.com';
const TEST_URL = 'https://sandbox.hesabe.com';
export const HSB_BASE_URL = TEST_URL;

export const HSB_MERCHANT_ID =
  HSB_BASE_URL !== TEST_URL ? '26231920' : '842217';
export const HSB_ACCESS_CODE = 'c333729b-d060-4b74-a49d-7686a8353481';
export const SECRET_KEY = 'PkW64zMe5NVdrlPVNnjo2Jy9nOb7v1Xg';
export const IV_CODE = '5NVdrlPVNnjo2Jy9';
export const RESPONSE_URL =
  'https://sandbox.hesabe.com/customer-response?id=842217';
export const FAILURE_URL =
  'https://sandbox.hesabe.com/customer-response?id=842217';

export const HSB_API_VERSION = '2.0';
