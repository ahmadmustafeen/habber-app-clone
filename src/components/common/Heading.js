import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Color} from '../../constants/Colors';

const Heading = ({extraStyling, children}) => {
  return <Text style={[styles.title, extraStyling]}>{children}</Text>;
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: Color.appColor,
  },
});
export {Heading};
