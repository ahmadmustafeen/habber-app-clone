import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FastImage} from './FastImage';

export const ThumbnailClub = (props) => {
  return (
    <View style={styles.containerStyle}>
      <FastImage
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
        }}
      />
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
  },
});
