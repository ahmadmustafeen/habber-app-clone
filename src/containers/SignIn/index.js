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
} from 'react-native-responsive-screen';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignIn = (props) => {
  const { t } = useTranslation(['login']);
  const dispatch = useDispatch();
  const { navigate } = props.navigation;
  const { colors } = useTheme();

  const [state, setState] = useState({
    email: '',
    password: '',
  });




  const handleChange = (key, value) => {
    if (key === 'email' || key === 'phone') {
      value = value.replace(" ", "")
    }
    setState((state) => ({ ...state, [key]: value }));
  };


  const validate = () => {

    return (
      validateIsTrue(validateEmail(state.email), `${t('Please')}  ${t('email')}`, false, t('ok')) &&
      validateIsTrue(validatePassword(state.password), `${t('Please')}  ${t('password')}`, false, t('ok'))

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

    <ScrollView
    // scrollEnabled={scrollEnabled}
    // onContentSizeChange={onContentSizeChange}
    >
      <ImageBackground
        style={{
          height: hp(100),
          paddingHorizontal: wp(5),
          paddingBottom: hp(5),
          justifyContent: 'flex-end',
        }}
        resizeMode="stretch"
        source={require('_assets/images/background.jpg')}>


        <View key="header">
          <AuthHeader {...props} customNavigate />

          <AppText bold color={colors.primary} heading style={[styles.hellotxt, { marginLeft: 5 }]}>
            {t('signInHeader')}
          </AppText>

          <AppText white secondary style={{ marginBottom: 10 }}>
            {t('signInLabel')}
          </AppText>
        </View>

        <View key="content" style={styles.content}>


          <InputWithLabel
            white
            placeholder="ahmadalajmi@gmail.com"
            label={t('email')}
            value={state.email}
            onChangeText={(value) => handleChange('email', value)}
          />


          <InputWithLabel
            white
            secureTextEntry
            placeholder="*********"
            label={t('password')}
            value={state.password}
            onChangeText={(value) => handleChange('password', value)}
          />


          <AppText
            underline
            style={[styles.forgotPassword, { color: colors.primary }]}
            size={18}
            onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
            {t('forgetPassword')}
          </AppText>

          <View style={{ alignItems: 'center' }}>
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
                marginVertical: 20,
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
        <View style={{ width: wp(20), alignSelf: 'flex-end' }}>
          <AppText
            right
            underline
            primary
            size={30}
            onPress={() => navigate('Drawer', { screen: 'Home' })}>
            {t('skip')}
          </AppText>
        </View>
        {/* <TouchableOpacity style={{ backgroundColor: 'red', width: wp(20) }} onPress={() => navigate('Drawer', { screen: 'Home' })}>
        <Text>hhh</Text>
      </TouchableOpacity> */}

      </ImageBackground>
    </ScrollView>

  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: hp(4),
    flexDirection: 'column',
  },
  bgImage: {
    flex: 1,
  },
  hellotxt: {
    marginTop: wp(8),
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: wp(4),
  },
});
export default SignIn;
