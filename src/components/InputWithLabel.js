import React from 'react';
import { View, StyleSheet, TextInput, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Color } from '../constants/Colors';

import { AppText } from './common/AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { color } from 'react-native-reanimated';
const InputWithLabel = (props) => {
  const { colors } = useTheme();

  const { containerStyle, white, label, inputRef, required, maxLength, primary, borderColor, } = props;

  return (
    <View style={[styles.inputContainerStyle, containerStyle,]}>
      { label && (
        <AppText white={white} secondary={!primary} primary={primary} >
          {`${label} ` || `Label Name`}
          {required ? <AppText white>*</AppText> : null}
        </AppText>
      )}
      <TextInput
        {...props}
        ref={(r) => {
          inputRef && inputRef(r);
        }}
        placeholderTextColor={Color.placeholder}
        maxLength={maxLength}
        style={[styles.inputFieldStyle, { borderColor: (borderColor || colors.primary) }, { color: (props.color || "white"), textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingBottom: 10,
    width: '100%',
  },
  inputFieldStyle: {
    marginVertical: hp(1.0),
    height: hp(5.8),
    paddingVertical: 3,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 20,

    backgroundColor: 'transparent',
  },
});
export { InputWithLabel };
