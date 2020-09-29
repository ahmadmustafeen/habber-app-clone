import React from 'react';

import FastImage from 'react-native-fast-image';

export const ThumbnailBookmarks = (props) => {
  console.log(props.url);
  return (
    <FastImage
      style={{
        width: 80,
        height: 230,
        borderWidth: 1,
        marginHorizontal: 3,
        borderRadius: 10,
      }}
      source={{
        uri: 'https://unsplash.it/400/400?image=1',
        priority: FastImage.priority.normal,
      }}
      // source={require('../assets/images/background.jpg')}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
