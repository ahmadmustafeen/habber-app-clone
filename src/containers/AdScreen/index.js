import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { AppText, BackgroundImage } from '_components/common';
import * as NavigationService from '../../../NavigationService';
import { AD_SCREEN, SIGNIN_SCREEN } from '../../constants/Screens';
import { withDataActions, withoutDataActions } from '../../redux/actions';
import { FETCH_AD_SUCCESS, FETCH_AD_SUCCESS_REFURB, SKIP_AD } from '../../redux/actionTypes';

const AdScreen = (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutDataActions(SKIP_AD))
  }, [])
  const { navigate } = props.navigation;
  console.log('AD PROPS', props.route.params.image);
  return (
    <ImageBackground
      noPadding
      resizeMode="contain"
      style={{ width: "100%", height: '100%' }}
      source={{ uri: props.route.params.image }}>
      <TouchableOpacity
        style={{
          // flex: 1,
          position: 'absolute',
          bottom: 0,
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(8),
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          justifyContent: 'center',
        }}
        // onPress={() => NavigationService.navigate(AD_SCREEN, { screen: 'Home' })}
        // onPress={() => console.log(props.navigation.goBack())}
        onPress={() => (dispatch(withDataActions({ ad: false }, FETCH_AD_SUCCESS_REFURB)) && (dispatch(withDataActions({ ad: false }, SKIP_AD))))}

      // dispatch(withDataActions(SKIP_AD))
      // dispatch(withoutDataActions(FETCH_AD_FAILURE))
      >
        <AppText center bold>
          SKIP AD
          </AppText>
      </TouchableOpacity>
    </ImageBackground >
  );
};
export default AdScreen;
