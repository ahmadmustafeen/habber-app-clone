import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {SIGNIN_SCREEN} from '../../constants/Screens';

const Language = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>Select Your Language</AppText>
        <Button onPress={() => navigate(SIGNIN_SCREEN)}>English</Button>
        <Button onPress={() => navigate(SIGNIN_SCREEN)}>Arabic</Button>
      </View>
    </Screen>
  );
};
export default Language;
