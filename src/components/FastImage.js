import React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';

import RNFastImage from 'react-native-fast-image';

const FastImage = (props) => {
  const { resizeMode, onPress, style } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <RNFastImage
        {...props}
        style={styles.image}
        resizeMode={
          resizeMode
            ? RNFastImage.resizeMode[resizeMode]
            : RNFastImage.resizeMode.cover
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export { FastImage };
