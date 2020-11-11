import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImage } from './FastImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const ThumbnailBookmarks = (props) => {
  return (
    <View style={styles.containerStyle}>
      <FastImage source={{ uri: props.url }} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: wp(12.33),
    aspectRatio: 0.34,
    // width: 80,
    // height: 230,
    borderWidth: 1,
    // marginRight: 6,
    marginLeft: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
