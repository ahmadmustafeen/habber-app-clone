/* eslint-disable import/named */
import {create} from 'apisauce';
import {BASE_URL, API_VERSION} from '_constants/Network';

// Rest Client for Americamp APIs
export const RestClient = create({
  baseURL: `${BASE_URL}/${API_VERSION}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  },
  timeout: 30000,
});
