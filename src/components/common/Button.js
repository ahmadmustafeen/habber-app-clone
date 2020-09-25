import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppText} from './AppText';
import {Color} from '../../constants/Colors';
const Button = (props) => {
  const {title, color, onPress} = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        height: 55,
        // width: '100%',
        borderRadius: 35,
        backgroundColor: color || Color.appColor,
      }}
      onPress={onPress}>
      <AppText
        extraStyling={{
          paddingLeft: 20,
          textAlign: 'left',
          color: 'white',
          fontSize: 30,
        }}>
        {title || 'Button'}
      </AppText>
      <View style={{position: 'absolute', right: 15}}>
        <SimpleLineIcons name="arrow-right" size={25} color="white" />
      </View>
    </TouchableOpacity>
  );
};
export {Button};
