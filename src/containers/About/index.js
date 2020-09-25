import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';

const About = (props) => {
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>About</AppText>
      </View>
    </Screen>
  );
};
export default About;
