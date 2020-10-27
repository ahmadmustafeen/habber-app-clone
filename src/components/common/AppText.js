import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Color} from '../../constants/Colors';
const AppText = (props) => {
  const {colors} = useTheme();
  const {
    children,
    heading,
    bold,
    secondary,
    primary,
    style,
    underline,
    size,
    center,
    right,
    color,
    white,
  } = props;

  return (
    <Text
      {...props}
      style={[
        styles.TextStyle,
        style && style,
        heading && {fontSize: 30},
        bold && {fontWeight: 'bold'},
        color && {color},
        secondary && {color: colors.secondary},
        primary && {color: colors.primary},
        white && {color: colors.white},
        underline && {textDecorationLine: 'underline'},
        size && {fontSize: parseInt(size)},
        center && {textAlign: 'center'},
        right && {textAlign: 'right'},
      ]}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
  },
});
export {AppText};
