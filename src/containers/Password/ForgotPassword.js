import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {RESET_PASSWORD_SCREEN} from '../../constants/Screens';

export const ForgotPassword = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>Forgot Password</AppText>
        <Button onPress={() => navigate(RESET_PASSWORD_SCREEN)}>
          Reset Password
        </Button>
      </View>
    </Screen>
  );
};
