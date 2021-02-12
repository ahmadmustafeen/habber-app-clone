import { Platform } from 'react-native';
import { Alert, I18nManager } from 'react-native';

export const validateEmail = (email) => {
  return (
    email &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
  );
};

export const validatePassword = (password) => password.length >= 6;
// export const validatePhone = (phone) => phone && phone.length > 9;



export const validatePhone = number => {
  var regex = new RegExp("^[0-9.]*$");
  if (number.length > 10 && number.length < 16) {
    if (regex.test(number)) {
      return true
    }
  }
  return false
}




export const validateIsTrue = (val, text = 'details', concat = true, button = "ok") => {
  if (!val) {

    // Alert.alert(concat ? `${please} ${text}` : text)
    Platform.OS === 'ios' ?
      Alert.alert(concat ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', }])
      : (
        I18nManager.isRTL ?
          Alert.alert(concat ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : button }])
          : Alert.alert(concat ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : button }]
          )
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
