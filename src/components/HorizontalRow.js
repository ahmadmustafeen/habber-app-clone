import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const HorizontalRow = (props) => {
  return <View style={props.style || styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    marginVertical: 10,
    borderWidth: 0.5,
  },
});
export { HorizontalRow };
