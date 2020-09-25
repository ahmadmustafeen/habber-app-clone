import AsyncStorage from '@react-native-community/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error saving value', e);
  }
};

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error reading value', e);
  }
  return null;
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // saving error
  }
};

export const getAllKeys = async () => {
  try {
    const data = await AsyncStorage.getAllKeys();
    if (data[0]) {
      // value previously stored
      return data;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('error getting all keys', e);
  }
  return null;
};
