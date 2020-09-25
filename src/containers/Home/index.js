import React, {useState} from 'react';
import {View} from 'react-native';
import {AppText, Screen, Button, Picker} from '../../components/common';

import {Color} from '../../constants/Colors';

const Home = (props) => {
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <AppText>Home</AppText>
      </View>
    </Screen>
  );
};
export default Home;
