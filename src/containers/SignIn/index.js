import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';

const SignIn = (props) => {
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>SignIn</AppText>
      </View>
    </Screen>
  );
};
export default SignIn;
