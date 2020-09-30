import React from 'react';
import {StyleSheet} from 'react-native';

import RNFastImage from 'react-native-fast-image';

const FastImage = (props) => {
  const {resizeMode} = props;
  return (
    <RNFastImage
      {...props}
      style={styles.image}
      resizeMode={
        resizeMode
          ? RNFastImage.resizeMode[resizeMode]
          : RNFastImage.resizeMode.cover
      }
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export {FastImage};
