
const PRODUCTION_URL = 'https://api.hesabe.com';
const TEST_URL = 'https://sandbox.hesabe.com';
export const HSB_BASE_URL = TEST_URL;

export const HSB_MERCHANT_ID =
  HSB_BASE_URL !== TEST_URL ? '26231920' : '842217';
export const HSB_ACCESS_CODE = HSB_BASE_URL !== TEST_URL ? "b4841a5c-e4c5-4434-a182-d2919fee443a" : 'c333729b-d060-4b74-a49d-7686a8353481';
export const SECRET_KEY = HSB_BASE_URL !== TEST_URL ? "jAvkVmK6XN3e8L65GEpaqL5ZBd0zbwWx" : 'PkW64zMe5NVdrlPVNnjo2Jy9nOb7v1Xg';
export const IV_CODE = HSB_BASE_URL !== TEST_URL ? "XN3e8L65GEpaqL5Z" : '5NVdrlPVNnjo2Jy9';

export const HSB_API_VERSION = '2.0';
