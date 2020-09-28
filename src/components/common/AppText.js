import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Color} from '../../constants/Colors';
const AppText = (props) => {
  const {colors} = useTheme();
  const {
    heading,
    bold,
    secondary,
    primary,
    style,
    underline,
    size,
    center,
    right,
  } = props;

  return (
    <Text
      {...props}
      style={[
        styles.TextStyle,
        style && style,
        heading && {fontSize: 30},
        bold && {fontWeight: 'bold'},
        secondary && {color: colors.secondary},
        primary && {color: colors.primary},
        underline && {textDecorationLine: 'underline'},
        size && {fontSize: size},
        center && {textAlign: 'center'},
        right && {textAlign: 'right'},
      ]}>
      {props.children}
    </Text>
  );
};
const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    color: Color.appColor,
  },
});
export {AppText};
