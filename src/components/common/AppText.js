import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Color} from '../../constants/Colors';
const AppText = (props) => {
  return (
    <Text
      {...props}
      style={[
        styles.TextStyle,
        {
          color: props.blue
            ? Color.appColor
            : props.gray
            ? Color.warmGray
            : 'black',
        },
        props.style && props.style,
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
