import { Platform } from 'react-native';
import { Alert, I18nManager } from 'react-native';

export const validateEmail = (email) => {
  return (
    email &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
  );
};

export const validatePassword = (password) => password.length >= 6;
export const validatePhone = (phone) => phone && phone.length > 9;
export const validateIsTrue = (val, text = 'details', concat = true, button = "ok") => {
  if (!val) {

    // Alert.alert(concat ? `${please} ${text}` : text)
    Platform.OS === 'ios' ? Alert.alert(concat ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', }])
      : Alert.alert(concat ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : button }]

      )
    return false
  }
  return true
}
export const validateWordCount = (value, length) => {
  if (value.split(' ').length >= length) return true;
  // Alert.alert(`Minimum ${length} words required`);
  return false;
};
