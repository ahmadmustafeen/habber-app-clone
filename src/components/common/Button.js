import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './AppText';
import {Color} from '../../constants/Colors';
const Button = (props) => {
  const {
    children,
    color,
    onPress,
    background,
    width,
    style,
    round,
    fontSize,
    secondary,
    primary,
  } = props;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          height: 45,
          width: width || '100%',
          borderRadius: round ? 35 : 5,
          backgroundColor: background || 'white',
        },
        primary && {backgroundColor: colors.primary},
        secondary && {backgroundColor: colors.secondary},
        style,
      ]}
      onPress={onPress}>
      <AppText
        size={fontSize}
        style={{
          textAlign: 'center',
          color: color || 'black',
          fontSize: 20,
        }}>
        {children || 'Button'}
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
export {Button};
