import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    small,
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
        small && {fontSize: 17},
      ]}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  TextStyle: {
    // fontSize: 20,
    fontSize: hp(2.6),
    color: 'black',
    textAlign: 'left',
  },
});
export {AppText};
