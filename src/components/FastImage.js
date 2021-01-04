import React from 'react';
import { TouchableHighlight } from 'react-native';
import { View } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, } from 'react-native';

import RNFastImage from 'react-native-fast-image';

const FastImage = (props) => {
  const { resizeMode, onPress, style } = props;
  // console.log(style, "stkye")
  return (
    <TouchableOpacity onPress={onPress} style={style}>

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
