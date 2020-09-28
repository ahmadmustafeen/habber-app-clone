import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {LANGUAGE_SCREEN} from '../../constants/Screens';

const Home = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen backgroundColor={Color.background}>
      <View key="header"></View>
      <View key="content">
        <TouchableOpacity onPress={() => navigate('Auth')}>
          <AppText>Home</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};
export default Home;
