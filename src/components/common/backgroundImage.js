import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import { Screen } from './Screen';
const BackgroundImage = (props) => {
  const { children, source, resizeMode, noPadding } = props;
  return (
    <ImageBackground
      {...props}
      style={styles.bgImage}
      resizeMode={resizeMode || 'stretch'}
      source={source || require('../../assets/images/background.jpg')}>
      <Screen noPadding={noPadding}>{children}</Screen>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
});

export { BackgroundImage };
