import React from 'react';
import { View, StyleSheet } from 'react-native';

import { FastImage } from './FastImage';

export const ThumbnailClub = (props) => {
  return (
    <FastImage {...props} style={styles.containerStyle} source={{ uri: props.url }} />
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: 100,
    aspectRatio: 1,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
