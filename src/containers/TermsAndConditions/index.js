import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Header} from '../../components';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';

const TermsAndConditions = (props) => {
  return (
    <ScrollView>
      <Header {...props} title={'Terms & Conditions'} />
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
