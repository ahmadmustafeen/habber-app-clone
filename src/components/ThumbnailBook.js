import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FastImage} from './FastImage';

export const ThumbnailBook = (props) => {
  return (
    <View style={styles.containerStyle}>
      <FastImage source={{uri: props.url}} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: 160,
    height: 250,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
