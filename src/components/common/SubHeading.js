import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Color} from '../../constants/Colors';
const SubHeading = ({extraStyling, children, blue, gray}) => {
  return (
    <Text
      style={[
        styles.subTitle,
        {color: blue ? Color.appColor : 'black'},
        extraStyling && extraStyling,
      ]}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  subTitle: {
    fontSize: 24,
    color: Color.appColor,
  },
});

export {SubHeading};
