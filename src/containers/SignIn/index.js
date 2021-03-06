import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { withDataActions } from '_redux/actions/GenericActions';
import { SIGN_IN } from '_redux/actionTypes';
import { InputWithLabel, RoundIcon, AuthHeader } from '_components';
import { AppText, BackgroundImage, Button } from '_components/common';
import { FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN } from '_constants/Screens';
import { validateEmail, validateIsTrue, validatePassword } from '../../helpers/Validators';
import { checkIfLoading } from '_redux/selectors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Screen } from '../../components/common';
import { withoutDataActions } from '../../redux/actions';
import { SETTING_REMOVAL } from '../../redux/actionTypes';
import { HOME, SETTINGS_SCREEN } from '../../constants/Screens';
import { I18nManager } from 'react-native';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';

const SignIn = (props) => {
  const { t } = useTranslation(['login']);
  const dispatch = useDispatch();
  const { navigate } = props.navigation;
  console.log(props, "SIGN IN")
  const { colors } = useTheme();

  const [state, setState] = useState({
    email: '',
    password: '',
  });


  const {
    UserProfileReducer,
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer
    };
  }, shallowEqual);


  const handleChange = (key, value) => {
    if (key === 'email' || key === 'phone') {
      value = value.replace(" ", "")
    }
    setState((state) => ({ ...state, [key]: value }));
  };
  useEffect(() => {
    if (props.route.params) {
      handleChange('email', '');
      handleChange('password', '')
    }
  }, [props])


  const _keyboardDidHide = () => {
    Keyboard.dismiss()
  }
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      keyboardDidHideListener.remove();
    }
  }, []);
  console.log(UserProfileReducer, "USERPROGILEASDSADA")
  useEffect(() => {
    if (UserProfileReducer.setting) {
      // dispatch(withoutDataActions(SETTING_REMOVAL))
      navigate('Drawer')
    }

  }, [UserProfileReducer]);
  const validate = () => {

    return (
      validateIsTrue((state.email), `${t('Please')} ${t('email')}`, false,) &&
      validateIsTrue(validateEmail(state.email), I18nManager.isRTL ? "يرجى إدخال البريد الإلكتروني الصحيح" : "Please Enter a Valid Email", false) &&
      validateIsTrue(validatePassword(state.password), `${t('Please')} ${t('password')}`, false,)

    )
  };

  const onSignIn = () => {
    validate() && dispatch(withDataActions(state, SIGN_IN));
  };
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        SIGN_IN,
      )
    };
  }, shallowEqual);
  return (


    <KeyboardAwareScrollView
      style={{ height: heightPercentageToDP(96) }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{ flexGrow: 1, }}
      // automaticallyAdjustContentInsets={true
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      scrollsToTop={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="never"
      bounces={false}
    // enableResetScrollToCoords={false}

    >
      <ImageBackground
        style={{
          // paddingTop: hp(2),
          // height: hp(96),
          flex: 1,
          paddingHorizontal: wp(5),
          // paddingBottom: hp(5),
          justifyContent: 'flex-end',
        }}
        resizeMode="stretch"
        source={require('_assets/images/background.jpg')}>


        <View key="header">
          <AuthHeader {...props} customNavigate />

          <AppText bold color={colors.primary} heading style={[styles.hellotxt, { marginLeft: 5 }]}>
            {t('signInHeader')}
          </AppText>

          <AppText white secondary style={(Platform.OS === 'ios' && I18nManager.isRTL) ? null : { marginBottom: hp(0) }}>
            {t('signInLabel')}
          </AppText>
        </View>

        <View key="content" style={styles.content}>


          <InputWithLabel
            white

            label={t('email')}
            value={state.email}
            onChangeText={(value) => handleChange('email', value)}
          />


          <InputWithLabel
            white
            secureTextEntry
            label={t('password')}
            value={state.password}
            onChangeText={(value) => handleChange('password', value)}
          />

          <View style={{ width: I18nManager.isRTL ? wp(30) : wp(50), alignSelf: 'flex-end' }}>
            <AppText
              underline
              style={[styles.forgotPassword, { color: colors.primary }]}
              size={18}
              onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
              {t('forgetPassword')}
            </AppText>
          </View>


          <View style={{ alignItems: 'center', margin: 0 }}>
            <Button
              loading={isLoading}
              width={wp(60)}
              color={colors.secondary}
              round
              onPress={onSignIn}>
              {t('signIn')}
            </Button>


            <AppText
              underline
              center
              primary
              onPress={() => navigate(SIGNUP_SCREEN)}
              style={{
                marginVertical: wp(1),
              }}>
              {t('createAccount')}
            </AppText>


            {/* <AppText
          white
          style={{textAlign: 'center', marginBottom: 10}}
          secondary
          onPress={() => navigate(SIGNUP_SCREEN)}>
          {`OR

Login with Social media account`}
        </AppText> */}
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundIcon
            name="sc-facebook"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="google"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="sc-twitter"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
        </View>  */}
          </View>
        </View>
        <View style={[{ width: wp(20), paddingBottom: hp(2), marginTop: hp(-10), alignSelf: 'flex-end' }]}>
          <AppText
            right
            underline
            primary
            size={30}
            onPress={() => {
              setState({
                email: '',
                password: '',
              });
              (navigate(HOME) || (navigate('Drawer', { screen: HOME })))
            }}
          >
            {t('skip')}
          </AppText>
        </View>
        {/* <TouchableOpacity style={{ backgroundColor: 'red', width: wp(20) }} onPress={() => navigate('Drawer', { screen: 'Home' })}>
        <Text>hhh</Text>
      </TouchableOpacity> */}
      </ImageBackground >
    </KeyboardAwareScrollView>



  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: I18nManager.isRTL ? hp(0) : hp(4),
    flexDirection: 'column',
  },
  bgImage: {
    flex: 1,
  },
  hellotxt: {
    paddingTop: (I18nManager.isRTL) ? wp(3) : wp(10),
    // paddingTop: wp(10)
  },
  forgotPassword: {
    // marginTop: (Platform.OS === 'ios' && I18nManager.isRTL) ? wp(-2) : wp(0),
    textAlign: 'right',
    marginBottom: (I18nManager.isRTL) ? wp(0) : wp(2),
    // marginBottom: wp(2)
  },
});
export default SignIn;
