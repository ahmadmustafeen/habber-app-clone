import React from 'react';
import {StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './AppText';
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
    bold,
    borderRadius,
    loading,
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
          backgroundColor: background || colors.primary,
          marginVertical: 3,
        },
        borderRadius && {borderRadius: parseInt(borderRadius)},
        primary && {backgroundColor: colors.primary},
        secondary && {backgroundColor: colors.secondary},
        style,
      ]}
      onPress={onPress}>
      <AppText
        size={fontSize}
        bold={bold}
        style={{
          textAlign: 'center',
          color: color || 'white',
          fontSize: 20,
        }}>
        {children || 'Button'}
      </AppText>
      <ActivityIndicator
        animating={loading || false}
        size="small"
        color={color || 'white'}
        style={styles.loadingIndicator}
      />
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
  loadingIndicator: {
    position: 'absolute',
    right: 15,
  },
});
export {Button};
