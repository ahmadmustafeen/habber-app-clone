import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Screen, Button} from '../../components/common';

import {Color} from '../../constants/Colors';
import {FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN} from '../../constants/Screens';

const SignIn = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <Button>SIGN IN</Button>
        <AppText onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          Forgot Password
        </AppText>
        <AppText onPress={() => navigate(SIGNUP_SCREEN)}>
          Create New Account
        </AppText>
      </View>
    </Screen>
  );
};
export default SignIn;
