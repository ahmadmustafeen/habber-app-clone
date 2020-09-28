import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './common/AppText';
import {Color} from '../constants/Colors';
const SocialIcon = (props) => {
  const {children, color, onPress, background} = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        width: 60,
        aspectRatio: 1,

        borderRadius: 30,
        backgroundColor: background || Color.primary,
      }}
      onPress={onPress}>
      <AppText
        style={{
          textAlign: 'center',
          color: color || 'black',
          fontSize: 25,
        }}>
        {'Button'}
      </AppText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {},
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
});
export {SocialIcon};
