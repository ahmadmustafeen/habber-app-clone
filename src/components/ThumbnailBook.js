import React from 'react';

import FastImage from 'react-native-fast-image';

export const ThumbnailBook = (props) => {
  console.log(props.url);
  return (
    <FastImage
      style={{
        width: 160,
        height: 250,
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
      // source={{
      //     uri: 'https://unsplash.it/400/400?image=1',
      //     headers: { Authorization: 'someAuthToken' },
      //     priority: FastImage.priority.normal,
      // }}
      source={require('../assets/images/background.jpg')}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
