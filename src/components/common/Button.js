import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './AppText';
import {Color} from '../../constants/Colors';
const Button = (props) => {
  const {children, color, onPress} = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        height: 45,
        // width: '100%',
        borderRadius: 35,
        backgroundColor: color || Color.appColor,
      }}
      onPress={onPress}>
      <AppText style={styles.text}>{children || 'Button'}</AppText>
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
});
export {Button};
