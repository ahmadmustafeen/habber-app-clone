import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Color} from '../constants/Colors';

import {AppText} from './common/AppText';

const InputWithLabel = (props) => {
  const {colors} = useTheme();

  const {viewStyle, label, inputRef, required, maxLength, primary} = props;

  return (
    <View style={[styles.inputContainerStyle, viewStyle]}>
      {label && (
        <AppText white secondary={!primary} primary={primary}>
          {`${label} ` || `Label Name`}
          {required ? <AppText>*</AppText> : null}
        </AppText>
      )}
      <TextInput
        {...props}
        ref={(r) => {
          inputRef && inputRef(r);
        }}
        placeholderTextColor={Color.placeholder}
        maxLength={maxLength}
        style={[styles.inputFieldStyle, {borderColor: colors.primary}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    paddingBottom: 10,
    width: '100%',
  },
  inputFieldStyle: {
    marginVertical: 10,
    height: 45,
    paddingVertical: 3,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 20,
    color: '#000000',
    backgroundColor: 'transparent',
  },
});
export {InputWithLabel};
