/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {AppText} from './common';

const Header = ({navigation}) => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5,
      }}>
      <ImageBackground
        style={{
          height: 120,
          width: '100%',
        }}
        source={require('../assets/images/background.jpg')}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
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
            source={require('../assets/images/Screenshot_Logo.jpg')}
          />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}></View>
      </ImageBackground>
    </View>
  );
};

export default Header;
