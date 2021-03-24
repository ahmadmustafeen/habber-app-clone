import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const RoundIcon = (props) => {
  const { background, large, small } = props;
  const { colors } = useTheme();
  return (
    <Icon
      containerStyle={[
        {
          justifyContent: 'center',
          width: wp(12),
          aspectRatio: 1,
          borderRadius: wp(25),
          backgroundColor: background || colors.primary,
        },
        large && {
          borderRadius: 45,
          width: 90,
        },
        small && {
          width: wp(9),
        },
      ]}
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
export { RoundIcon };
