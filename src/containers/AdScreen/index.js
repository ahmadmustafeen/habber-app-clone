import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppText, Screen} from '_components/common';

import {Color} from '_constants/Colors';
import {LANGUAGE_SCREEN} from '_constants/Screens';

const AdScreen = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>AdScreen</AppText>
        <TouchableOpacity onPress={() => navigate(LANGUAGE_SCREEN)}>
          <AppText>Skip</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};
export default AdScreen;
