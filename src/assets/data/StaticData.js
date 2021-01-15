

import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  I18nManager,
  Linking,
  Platform,
} from 'react-native';
export const forgotPassword = {
  forgot_password: 'Forgot Password?',
  enter_email:
    'Enter the email address you used to create your account and we will email you a link to reset your password',
  resetPassword: 'Reset Password',
  modalData: {
    heading: 'Please check your Registered Email',
    description: 'Your Password Reset Link Has Been Sent To Your Email',
    buttonLabel: 'Continue',
  },
};

export const signUp = {
  agreement: I18nManager.isRTL ? 'عناويني' : 'By creating an account you agree to our',
  TermsAndPolicies: I18nManager.isRTL ? 'عناويني' : 'Terms of Services and Privacy Policy',
  sign_up: I18nManager.isRTL ? 'عناويني' : 'SIGN UP',
  modalData: {
    heading: I18nManager.isRTL ? 'عناويني' : 'Welcome to HEBBER!',
    description: I18nManager.isRTL ? 'عناويني' : 'Your ID Has Been Registered Successfully',
    buttonLabel: I18nManager.isRTL ? 'عناويني' : 'Continue',
  },
};


export const JOIN_US = {
  modalData: {
    heading: I18nManager.isRTL ? 'عناويني' : 'We Will Contact You Shortly!',
    description: I18nManager.isRTL ? 'عناويني' : 'Your Join Request Form is submitted Successfully',
    buttonLabel: I18nManager.isRTL ? 'عناويني' : 'Continue',
  },
};

export const CONTACT_US = {
  modalData: {
    heading: I18nManager.isRTL ? 'عناويني' : 'We Will Contact You Shortly!',
    description: I18nManager.isRTL ? 'عناويني' : 'Your Contact Request Submission Form is submitted Successfully',
    buttonLabel: I18nManager.isRTL ? 'عناويني' : 'Continue',
  },
};

export const ADD_NEW_ADDRESS = {
  modalData: {

    heading: I18nManager.isRTL ? 'عناويني' : 'Address Added Successfully!',
    description: I18nManager.isRTL ? 'عناويني' : 'You can start making orders to this address now',
    buttonLabel: I18nManager.isRTL ? 'عناويني' : 'ok',
  },
};