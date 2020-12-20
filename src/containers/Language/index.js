import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText, Button, BackgroundImage } from '_components/common';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { SWITCH_LANG } from '_redux/actionTypes';

const Language = (props) => {
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <BackgroundImage>
      <View key="header" style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('_assets/images/Screenshot_Logo.jpg')}
        />
      </View>
      <View key="content" style={{ alignItems: 'center' }}>
        <AppText style={styles.selecttxt}>Select Your Language</AppText>
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
    width: 100,
    height: 100,
    marginVertical: 20,
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
    marginBottom: 25,
  },
});
export default Language;
