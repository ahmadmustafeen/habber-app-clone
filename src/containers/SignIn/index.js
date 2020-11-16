import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { withDataActions } from '_redux/actions/GenericActions';
import { SIGN_IN } from '_redux/actionTypes';
import { InputWithLabel, RoundIcon, AuthHeader } from '_components';
import { AppText, BackgroundImage, Button } from '_components/common';
import { FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN } from '_constants/Screens';
import { validateEmail, validatePassword } from '../../helpers/Validators';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignIn = (props) => {

  const { t } = useTranslation(["login"]);
  const dispatch = useDispatch();
  const { navigate } = props.navigation;
  const { colors } = useTheme();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = state;

  const handleChange = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  const { loading } = useSelector(({ LoadingReducer }) => {
    return {
      loading: LoadingReducer.loading,
    };
  }, shallowEqual);
  const validate = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email');
      return false;
    }
    if (!validatePassword(password)) {
      Alert.alert('Invalid Password');
      return false;
    }
    return true;
  };

  const onSignIn = () => {
    validate() && dispatch(withDataActions(state, SIGN_IN));
  };
  return (
    <BackgroundImage>
      <View key="header">
        <AuthHeader {...props} noIcon />

        <AppText bold color={colors.primary} heading style={styles.hellotxt}>
          {t('signInHeader')}
        </AppText>
        <AppText white secondary style={{ marginBottom: 10 }}>
          {t('signInLabel')}
        </AppText>
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          primary={true}
          placeholder="ahmadalajmi@gmail.com"
          label={t('email')}
          value={email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label={t('password')}
          value={password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <AppText
          underline
          style={styles.forgotPassword}
          size={18}
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          {t("forgetPassword")}
        </AppText>
        <View style={{ alignItems: 'center' }}>
          <Button
            loading={loading}
            width={wp(60)}
            color={colors.secondary}
            round
            onPress={onSignIn}>
            {t("signIn")}
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
      <View key="footer">
        <AppText
          right
          underline
          primary
          size={30}
          onPress={() => navigate('Drawer', { screen: 'Home' })}>
          {t('skip')}
        </AppText>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
  },
  hellotxt: {
    marginTop: wp(5),
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#c27e12',
    marginBottom: wp(4),
  },
});
export default SignIn;
