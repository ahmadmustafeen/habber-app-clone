import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {withoutDataActions} from '_redux/actions';
import {SKIP_AD} from '_redux/actionTypes';
import {AppText, BackgroundImage} from '_components/common';

const AdScreen = (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  console.log('AD PROPS', props);
  return (
    <BackgroundImage
      noPadding
      resizeMode="cover"
      source={require('_assets/images/background.jpg')}>
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
          onPress={() => dispatch(withoutDataActions(SKIP_AD))}>
          <AppText center bold>
            SKIP AD
          </AppText>
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
};
export default AdScreen;
