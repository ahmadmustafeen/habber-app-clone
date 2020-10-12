import React, {useState} from 'react';
import {View,ScrollView} from 'react-native';
import {AppText, Screen} from '../../components/common';
import Header from '../../components/Header';

import {Color} from '../../constants/Colors';

const TermsAndConditions = (props) => {
  return (
    <ScrollView>
    <Header {...props} title={"Terms & Conditions"} />
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>TermsAndConditions Content</AppText>
      </View>
    </Screen>
    </ScrollView>
  );
};
export default TermsAndConditions;
