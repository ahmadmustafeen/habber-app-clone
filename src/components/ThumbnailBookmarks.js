import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FastImage} from './FastImage';

export const ThumbnailBookmarks = (props) => {
  return (
    <View style={styles.containerStyle}>
      <FastImage source={{uri: props.url}} />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: 80,
    height: 230,
    borderWidth: 1,
    marginHorizontal: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
