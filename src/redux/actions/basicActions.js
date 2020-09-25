import {Alert} from 'react-native';

export const withDataActions = (payload = {}, type) => {
  return {type, payload};
};

export const withoutDataActions = (type) => {
  return {type, payload: null};
};
