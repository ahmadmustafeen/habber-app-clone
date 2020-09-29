import React, {useState} from 'react';

import {TouchableOpacity, View} from 'react-native';
import {AppText, Screen} from '../../components/common';
import {useTheme} from '@react-navigation/native';

import {Color} from '../../constants/Colors';
import {LANGUAGE_SCREEN} from '../../constants/Screens';
import {ImageSlider} from '../../components';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?tree', // Network image
    // require('./assets/images/girl.jpg'), // Local image
  ]);
  const {colors} = useTheme();
  return (
    // <Screen backgroundColor={Color.background}>
    //   <View key="header"></View>
    <View key="content">
      {/* <TouchableOpacity onPress={() => navigate('Auth')}> */}
      <ImageSlider images={images} />

      {/* </TouchableOpacity> */}
    </View>
    // </Screen>
  );
};
export default Home;
