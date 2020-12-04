import React from 'react';
import { View, StyleSheet, Text, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppText } from './common';

const Counter = (props) => {
  const { colors } = useTheme();
  const { onDecrement, onIncrement, value } = props;
  return (
    <View style={[styles.counter]}>
      <View style={[styles.operatorBtns, { backgroundColor: colors.secondary }]}>
        <AppText bold white center onPress={onDecrement}>
          -
        </AppText>
      </View>
      <AppText center bold style={styles.counterValue}>
        {value}
      </AppText>
      <View style={[styles.operatorBtns, { backgroundColor: colors.primary }]}>
        <AppText center bold white onPress={onIncrement}>
          +
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    // backgroundColor: '',
    alignItems: 'center',
    width: '40%',
    borderRadius: 20,
    overflow: 'hidden',
    height: 45,
  },
  operatorBtns: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
  },
  counterValue: {
    flex: 3,
    textAlign: 'center',
  },
});
export { Counter };
