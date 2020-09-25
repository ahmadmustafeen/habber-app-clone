import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';

export const ResetPassword = (props) => {
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>Reset Password</AppText>
      </View>
    </Screen>
  );
};
