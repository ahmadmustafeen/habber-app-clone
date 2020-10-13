import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {AppText, Screen} from '../../components/common';
import {Color} from '_constants/Colors';
import {Header} from '../../components';

const About = (props) => {
  return (
    <ScrollView>
      <Header {...props} title={'About Us'} />
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
