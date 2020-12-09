import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AppText } from './common';
import { FastImage } from './FastImage';

export const ThumbnailBook = (props) => {
  return (
    <FastImage {...props} style={styles.containerStyle} source={{ uri: props.url }} />
  )
};
const styles = StyleSheet.create({
  containerStyle: {

    width: wp(33.33),
    aspectRatio: 0.6,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,

  },
});
