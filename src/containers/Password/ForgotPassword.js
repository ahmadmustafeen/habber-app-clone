import {RESET_PASSWORD_SCREEN} from '../../constants/Screens';

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {InputWithLabel} from '../../components';
import {AppText, BackgroundImage, Button} from '../../components/common';

import {FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN} from '../../constants/Screens';

export const ForgotPassword = (props) => {
  const {navigate} = props.navigation;
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold heading primary>
          Forgot Password?
        </AppText>
        <AppText secondary>
          Enter the email address you used to create your account and we will
          email you a link to reset your password
        </AppText>
      </View>
      <View key="content">
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
      </View>
      <View key="footer">
        <Button onPress={() => navigate(RESET_PASSWORD_SCREEN)}>
          Reset Password
        </Button>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  createAccount: {
    textAlign: 'center',
  },
});
