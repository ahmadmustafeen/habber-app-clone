import React, {useState} from 'react';
import {View,ScrollView} from 'react-native';
import {AppText, Screen} from '../../components/common';
import Header from '../../components/Header';

import {Color} from '../../constants/Colors';

const About = (props) => {
  return (
    <ScrollView>
    <Header {...props} title={"About Us"} />
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>About Content</AppText>
      </View>
    </Screen>
    </ScrollView>
  );
};
export default About;
