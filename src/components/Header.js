/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {AppText} from './common';
import {Color} from '../constants/Colors';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ({navigation, onSave}) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <SimpleLineIcons name="arrow-left" size={20} color={Color.appColor} />
          <AppText blue>{` Back`}</AppText>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 4,
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '70%',
            height: '100%',
          }}
          resizeMode="center"
          source={require('../assets/ringside_logo/ringside_logo_svg.png')}
        />
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <MaterialIcons
          onPress={onSave}
          name="content-save-all"
          size={35}
          color={Color.appColor}
        />
      </View>
    </View>
  );
};

export default Header;
