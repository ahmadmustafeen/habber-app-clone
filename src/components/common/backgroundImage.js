import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';

import {Screen} from './Screen';
const BackgroundImage = ({children, source}) => {
  return (
    <ImageBackground
      style={styles.bgImage}
      resizeMode="stretch"
      source={source || require('../../assets/images/background.jpg')}>
      <Screen>{children}</Screen>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
});

export {BackgroundImage};
