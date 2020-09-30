import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FastImage} from './FastImage';

export const ThumbnailClub = (props) => {
  return (
    <View style={styles.containerStyle}>
      <FastImage source={{uri: props.url}} />
    </View>
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
