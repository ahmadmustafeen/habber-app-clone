import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {SIGNUP_SUCCESSFUL_SCREEN} from '../../constants/Screens';

const SignUp = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <Button onPress={() => navigate(SIGNUP_SUCCESSFUL_SCREEN)}>
          SIGN UP
        </Button>
      </View>
    </Screen>
  );
};
export default SignUp;
