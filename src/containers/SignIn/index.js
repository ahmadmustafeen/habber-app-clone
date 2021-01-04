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
import { checkIfLoading } from '_redux/selectors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ImageBackground } from 'react-native';

const SignIn = (props) => {
  const { t } = useTranslation(['login']);
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
  const { isLoading } = useSelector((state) => {
    return {
      isLoading: checkIfLoading(
        state,
        SIGN_IN,
      )
    };
  }, shallowEqual);
  return (
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
          value={email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <InputWithLabel
          white
          secureTextEntry
          placeholder="*********"
          label={t('password')}
          value={password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <AppText
          underline
          style={[styles.forgotPassword, { color: colors.primary }]}
          size={18}
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          {t('Forgot Password?')}
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
    </ImageBackground>
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
    marginTop: wp(5),
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: wp(4),
  },
});
export default SignIn;
