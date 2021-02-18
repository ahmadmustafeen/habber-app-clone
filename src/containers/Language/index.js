import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText, Button, BackgroundImage } from '_components/common';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { SWITCH_LANG } from '_redux/actionTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { I18nManager } from 'react-native';
import { BackHandler } from 'react-native';
const Language = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <BackgroundImage>
      <View key="header" style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('_assets/images/logo.png')}
        />
      </View>
      <View key="content" style={{ alignItems: 'center', paddingTop: hp(10) }}>
        <AppText style={styles.selecttxt}>{I18nManager.isRTL ? "اختر لغتك" : "Select Your Language"}</AppText>
        <Button
          style={styles.btn}
          round
          width="60%"
          background="white"
          color={colors.secondary}
          onPress={() =>
            dispatch(withDataActions({ language: { id: 2, iso: 'en' } }, SWITCH_LANG))
          }>
          English
        </Button>
        <Button
          round
          width="60%"
          background="white"
          color={colors.secondary}
          onPress={() =>
            dispatch(withDataActions({ language: { id: 1, iso: 'ar' } }, SWITCH_LANG))
          }>
          عربى
        </Button>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    height: hp(25),
    aspectRatio: 1,
    // marginVertical: 20,
    marginTop: '30%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selecttxt: {
    color: '#c27e12',
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    marginBottom: hp(2),
  },
});
export default Language;
