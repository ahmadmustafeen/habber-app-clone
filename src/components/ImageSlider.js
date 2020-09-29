import React, {useState} from 'react';

import {SliderBox} from 'react-native-image-slider-box';

import {useTheme} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';

const ImageSlider = (props) => {
  const {images} = props;

  const {colors} = useTheme();
  return (
    <SliderBox
      // resizeMethod={'resize'}
      // resizeMode={'contain'}
      ImageComponent={FastImage}
      images={images}
      sliderBoxHeight={200}
      dotStyle={{
        width: 30,
        height: 5,
        borderRadius: 15,
      }}
      circleLoop
      ImageComponentStyle={{
        borderRadius: 5,
        width: '97%',
        marginTop: 5,
        marginBottom: 30,
      }}
      imageLoadingColor="#2196F3"
      dotColor={colors.primary}
      inactiveDotColor="#90A4AE"
      autoplay
    />
  );
};
export {ImageSlider};
