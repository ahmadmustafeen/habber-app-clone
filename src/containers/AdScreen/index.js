import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppText, BackgroundImage } from '_components/common';
import * as NavigationService from '../../../NavigationService';
import { AD_SCREEN, SIGNIN_SCREEN } from '../../constants/Screens';
import { withDataActions } from '../../redux/actions';
import { FETCH_AD_SUCCESS, FETCH_AD_SUCCESS_REFURB, SKIP_AD } from '../../redux/actionTypes';

const AdScreen = (props) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const { navigate } = props.navigation;
  console.log('AD PROPS', props);
  return (
    <BackgroundImage
      noPadding
      resizeMode="cover"
      source={{ uri: "http://habber.attribes.com/storage/ads/12/Untitled-11611661955.jpg" }}>
      <View key="content" />
      <View key="footer">
        <TouchableOpacity
          style={{
            flex: 1,
            height: 50,
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            justifyContent: 'center',
          }}
          // onPress={() => NavigationService.navigate(AD_SCREEN, { screen: 'Home' })}
          // onPress={() => console.log(props.navigation.goBack())}
          onPress={() => (dispatch(withDataActions({ ad: false }, FETCH_AD_SUCCESS_REFURB)))}
        // dispatch(withDataActions(SKIP_AD))
        // dispatch(withoutDataActions(FETCH_AD_FAILURE))
        >
          <AppText center bold>
            SKIP AD
          </AppText>
        </TouchableOpacity>
      </View>
    </BackgroundImage >
  );
};
export default AdScreen;
