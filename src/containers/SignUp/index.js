import React, { useState, useEffect } from 'react';

import { ImageBackground } from 'react-native';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputWithLabel, RoundIcon, ModalScreen, AuthHeader } from '_components';
import { BackgroundImage, Button, AppText } from '_components/common';
import { signUp } from '_assets/data/StaticData';
import { withDataActions } from '_redux/actions/GenericActions';
import { SIGN_UP, SIGN_IN } from '_redux/actionTypes';
import useModal from '_utils/customHooks/useModal';
// import { BOOK_DETAILS_SCREEN } from '../../';
import { validateEmail, validatePassword, validateIsTrue } from '../../helpers/Validators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {
//   loginWithFacebook,
//   getInfoFromToken,
// } from '../../services/facebookLoginController';

// import {
//   googleSignInHandler,
//   isSignedIn,
// } from '../../services/googleLoginController';
import { checkIfLoading } from '_redux/selectors';
import { FORGOT_PASSWORD_SCREEN, TERMS_AND_CONDITIONS_SCREEN, BOOK_DETAILS_SCREEN, SIGNUP_TERM_CODITION } from '../../constants/Screens';

import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { I18nManager } from 'react-native';
import { BackHandler } from 'react-native';

const SignUp = (props) => {

  const dispatch = useDispatch();
  // const { navigate } = props.navigation;
  const { navigation } = props;
  const { visible } = useModal();

  const { t } = useTranslation(['createAccount']);
  const [state, setState] = useState({
    first_name: "",
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { first_name, last_name, email, password, password_confirmation } = state;

  const handleChange = (key, value) => {
    if (key === 'email' || key === 'phone') {
      value = value.replace(" ", "")
    }
    setState((state) => ({ ...state, [key]: value }));
  };


  const validate = () => {
    return (
      validateIsTrue(first_name, `${t('Please')} ${t('firstName')}`, false, t('ok')) &&
      validateIsTrue(last_name, `${t('Please')} ${t('lastName')}`, false, t('ok')) &&
      validateIsTrue(validateEmail(email), I18nManager.isRTL ? "يرجى إدخال البريد الإلكتروني الصحيح" : "Please Enter a Valid Email", false, t('ok')) &&
      validateIsTrue((password && password.length >= 8), I18nManager.isRTL ? 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل' : 'Password should be atleast 8 characters', false) &&
      validateIsTrue((password_confirmation), I18nManager.isRTL ? "الرجاء إدخال تأكيد كلمة المرور" : "Please Enter Confirm Password", false, t('ok')) &&
      validateIsTrue((password === password_confirmation), I18nManager.isRTL ? "كلمة السر غير متطابقة" : "Password Does Not Match", false, t('ok'))
    )


  };

  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }



  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);


  const onSignUp = () => {
    validate() && dispatch(withDataActions(state, SIGN_UP));
  };
  const onContinueModal = () => {
    dispatch(withDataActions(state, SIGN_IN));
  };
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        SIGN_UP,
        SIGN_IN
      )
    };
  }, shallowEqual);
  // const signInGoogle = async () => {
  //   let user = await isSignedIn();
  //   if (user) {
  //     Alert.alert('Ops!', 'Already Signed In');
  //     return user;
  //   }
  //   user = await googleSignInHandler();
  //   return user;
  // };
  // const signInFacebook = async () => {
  //   try {
  //     const data = await loginWithFacebook();
  //     const accessToken = data.accessToken.toString();
  //     const userInfo = await getInfoFromToken(accessToken);
  //     console.log('INFO', userInfo);
  //   } catch (error) {
  //     Alert.alert('ERROR', 'Something went wrong, contact admin!');
  //   }
  // };
  return (
    <ImageBackground
      style={{
        // height: hp(100),
        flex: 1,
        paddingHorizontal: wp(5),
        // paddingBottom: hp(5),
        justifyContent: 'flex-end',
      }}
      resizeMode="stretch"
      source={require('_assets/images/background.jpg')}>
      <KeyboardAwareScrollView
        //resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{ flexGrow: 1 }}
        // automaticallyAdjustContentInsets={true}
        // keyboardDismissMode="on-drag"
        // scrollsToTop={false}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps="never"

        // bounces={false}
        // enableResetScrollToCoords={false}>

        resetScrollToCoords={{ x: 0, y: 0 }}
        // contentContainerStyle={{ height: heightPercentageToDP(96), flexGrow: 1 }}
        // automaticallyAdjustContentInsets={true
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        bounces={false}
      >

        <View key="header">
          <AuthHeader {...props} />
        </View>
        <View key="content" style={styles.content}>
          <InputWithLabel
            white
            label={t('firstName')}
            required
            value={first_name}
            onChangeText={(value) => handleChange('first_name', value)}
          />
          <InputWithLabel
            white
            label={t('lastName')}
            required
            value={last_name}
            onChangeText={(value) => handleChange('last_name', value)}
          />
          <InputWithLabel
            white
            label={t('email')}
            required
            value={email}
            onChangeText={(value) => handleChange('email', value)}
          />
          <InputWithLabel
            white
            secureTextEntry
            label={t('password')}
            required
            value={password}
            onChangeText={(value) => handleChange('password', value)}
          />
          <InputWithLabel
            white
            secureTextEntry
            label={t('confirmPassword')}
            required
            value={password_confirmation}
            onChangeText={(value) => handleChange('password_confirmation', value)}
          />
          <View style={{ alignItems: 'center', paddingBottom: hp(5) }}>
            <AppText white secondary size={17}>
              {t('bycreating')}
            </AppText>
            {/* <TouchableOpacity onPress={() => navigation.navigate(SIGNUP_TERM_CODITION)}> */}


            {/* <AppText underline style={styles.termsandservices} size={17}
              linkOne={() => navigation.navigate(SIGNUP_TERM_CODITION)}
              linkTwo={() => navigation.navigate(SIGNUP_TERM_CODITION)}>
              {t('termAndService')}
            </AppText> */}
            {/* </TouchableOpacity> */}

            <View style={{ flexDirection: 'row', paddingBottom: hp(3) }}>
              <TouchableOpacity onPress={() => navigation.navigate(SIGNUP_TERM_CODITION)}>
                <AppText primary underline size={17}>{I18nManager.isRTL ? "أحكام وشروط" : "Terms and Condition"}</AppText>
              </TouchableOpacity>
              <AppText primary underline size={17}> {I18nManager.isRTL ? "و" : "And"} </AppText>
              <TouchableOpacity onPress={() => navigation.navigate("SignUpPolicy")}>
                <AppText primary underline size={17}>{I18nManager.isRTL ? "سياسة خاصة" : "Privacy Policy"}</AppText>
              </TouchableOpacity>
            </View>



            <Button round width="60%" onPress={onSignUp} loading={isLoading}>
              {t('signUp')}
            </Button>
          </View>
          {/* <AppText white secondary style={{ marginTop: 10, marginBottom: 10 }}>
          OR
        </AppText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}> */}
          {/* <RoundIcon
          name="sc-facebook"
          type="evilicon"
          color="#fff"
          onPress={signInFacebook}
        />
        <RoundIcon
          name="google"
          type="font-awesome"
          color="#fff"
          onPress={async () => console.log(await signInGoogle())}
        />
        <RoundIcon
          name="sc-twitter"
          type="evilicon"
          color="#fff"
          onPress={() => console.log('hello')}
        />
      </View> */}
          <ModalScreen
            visible={visible}
            onContinue={onContinueModal}
            loading={isLoading}
            {...signUp.modalData}
          />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: hp(5.4),
  },
  termsandservices: {
    // color: '#c27e12',
    color: 'white',
    marginTop: 5,
    marginBottom: 25,
  },
});

export default SignUp;
