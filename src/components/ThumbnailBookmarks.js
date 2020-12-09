import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImage } from './FastImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const ThumbnailBookmarks = (props) => {
  return (

    <FastImage {...props} style={styles.containerStyle} source={{ uri: props.url }} />
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: wp(12.33),
    aspectRatio: 0.34,
    borderWidth: 1,
    marginLeft: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
