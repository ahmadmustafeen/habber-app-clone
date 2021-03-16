

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
  forgot_password: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?',
  enter_email: I18nManager.isRTL ? 'أدخل عنوان البريد الإلكتروني الذي استخدمته لإنشاء حسابك وسنرسل لك رابطًا عبر البريد الإلكتروني لإعادة تعيين كلمة مرورك' :
    'Enter the email address you used to create your account and we will email you a link to reset your password',
  resetPassword: I18nManager.isRTL ? 'إعادة تعيين كلمة المرور' : 'Reset Password',
  modalData: {
    heading: I18nManager.isRTL ? 'يرجى التحقق من بريدك الإلكتروني المسجل' : 'Please check your Registered Email',
    description: I18nManager.isRTL ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' : 'Your Password Reset Link Has Been Sent To Your Email',
    buttonLabel: I18nManager.isRTL ? 'سجل' : 'Continue',
  },
};

export const signUp = {
  agreement: I18nManager.isRTL ? 'من خلال إنشاء حساب فإنك توافق على' : 'By creating an account you agree to our',
  TermsAndPolicies: I18nManager.isRTL ? 'شروط الخدمات وسياسة الخصوصية' : 'Terms of Services and Privacy Policy',
  sign_up: I18nManager.isRTL ? '' : 'SIGN UP',
  modalData: {
    heading: I18nManager.isRTL ? 'مرحبًا بك في حبر!' : 'Welcome to HEBBER!',
    description: I18nManager.isRTL ? 'تم تسجيل هويتك بنجاح' : 'Your ID Has Been Registered Successfully',
    buttonLabel: I18nManager.isRTL ? 'استمر' : 'Continue',
  },
};


export const JOIN_US = {
  modalData: {
    heading: I18nManager.isRTL ? 'سوف نتصل بك قريبا!' : 'We Will Contact You Shortly!',
    description: I18nManager.isRTL ? 'تم تقديم نموذج طلب الانضمام الخاص بك بنجاح' : 'Your Join Request Form is Submitted Successfully',
    buttonLabel: I18nManager.isRTL ? 'استمر' : 'Continue',
  },
};

export const CONTACT_US = {
  modalData: {
    heading: I18nManager.isRTL ? 'سوف نتصل بك قريبا' : 'We Will Contact You Shortly!',
    description: I18nManager.isRTL ? 'تم تقديم نموذج تقديم طلب الاتصال الخاص بك بنجاح' : 'Your Contact Request Submission Form is Submitted Successfully',
    buttonLabel: I18nManager.isRTL ? 'استمر' : 'Continue',
  },
};
export const REQUEST_BOOK_MODAL = {
  modalData: {
    heading: I18nManager.isRTL ? 'سوف نتصل بك قريبا' : 'We Will Contact You Shortly',
    description: I18nManager.isRTL ? 'تم إرسال نموذج طلب كتابك بنجاح' : 'Your Book Request Form is Submitted Successfully',
    buttonLabel: I18nManager.isRTL ? 'حسنا' : 'OK',
  },
};
export const ADD_NEW_ADDRESS = {
  modalData: {

    heading: I18nManager.isRTL ? 'تمت إضافة العنوان بنجاح!' : 'Address Added Successfully!',
    description: I18nManager.isRTL ? 'يمكنك البدء في إصدار أوامر على هذا العنوان الآن' : 'You can start making orders to this address now',
    buttonLabel: I18nManager.isRTL ? 'حسنا' : 'OK',
  },
};
export const PASSWORD_CHANGE = {
  modalData: {
    heading: I18nManager.isRTL ? 'تم تغيير الرقم السري بنجاح!' : 'Password Changed Successfully!',
    description: I18nManager.isRTL ? 'يمكنك تسجيل الدخول باستخدام كلمة المرور الجديدة الخاصة بك' :
      'You can login with your new password making',
    buttonLabel: I18nManager.isRTL ? 'حسنا' : 'OK',
  },
};

export const CREATE_ORDER_TEXT = {
  modalData: {
    heading: I18nManager.isRTL ? 'تم إنشاء طلبك بنجاح!' : 'Order Is Successfully Placed',
    description: I18nManager.isRTL ? 'تم إنشاء طلبك بنجاح!' : 'Your Order Is Created Successfully!',
    buttonLabel: I18nManager.isRTL ? 'استمر' : 'Continue',
  },
};