import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Icon} from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './common/AppText';
import {Color} from '../constants/Colors';
const SocialIcon = (props) => {
  const {background} = props;
  return (
    <Icon
      containerStyle={{
        justifyContent: 'center',
        width: 60,
        aspectRatio: 1,
        borderRadius: 30,
        backgroundColor: background || Color.primary,
      }}
      {...props}
      // color
      // disabled
      // disabledStyle
      // iconStyle
      // iconProps
      // name
      // onPress
      // onLongPress
      // raised
      // reverse
      // reverseColor
      // size
      // solid
      // type
      // underlayColor
    />
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
export {SocialIcon};
