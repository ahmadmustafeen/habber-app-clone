import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

import RNFastImage from 'react-native-fast-image';

const FastImage = (props) => {
  const {resizeMode, onPress} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <RNFastImage
        {...props}
        style={styles.image}
        resizeMode={
          resizeMode
            ? RNFastImage.resizeMode[resizeMode]
            : RNFastImage.resizeMode.cover
        }
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
export {FastImage};
