import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppText, BackgroundImage} from '_components/common';

import {Color} from '_constants/Colors';
import {LANGUAGE_SCREEN} from '_constants/Screens';

const AdScreen = (props) => {
  const {colors} = useTheme();
  const {navigate} = props.navigation;
  return (
    <BackgroundImage
      noPadding
      resizeMode="cover"
      source={require('_assets/images/background.jpg')}>
      <View key="content" />
      <View key="footer">
        <TouchableOpacity
          style={{
            flex: 1,
            height: 50,
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            justifyContent: 'center',
          }}
          onPress={() => navigate(LANGUAGE_SCREEN)}>
          <AppText center bold>
            SKIP AD
          </AppText>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
};
export default AdScreen;
