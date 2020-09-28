import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Color} from '../../constants/Colors';
const AppText = (props) => {
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
        secondary && {color: Color.secondary},
        primary && {color: Color.primary},
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
