import {Alert} from 'react-native';

export const withDataActions = (payload = {}, type) => {
  return {type, payload};
};

export const withoutDataActions = (type) => {
  return {type, payload: null};
};

export const errorAction = (payload, type) => {
  Alert.alert('Error', 'Something went wrong, contact admin');
  return {type, payload};
};
