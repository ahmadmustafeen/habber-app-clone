import React, {useState} from 'react';
import {View, ScrollView, ImageBackground, I18nManager} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, Screen} from '_components/common';
// import { MY_PROFILE } from '_constants/Screens';
import {Header} from '_components/Header';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {withDataActions} from '_redux/actions';
import {UPDATE_PASSWORD} from '_redux/actionTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ChangePassword = (props) => {
  const {navigate} = props.navigation;
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const setStateHandler = (key, val) => {
    setState({...state, [key]: val});
  };
  const passChange = () => {
    dispatch(withDataActions(state, UPDATE_PASSWORD));
    // navigate(MY_PROFILE)
  };
  return (
    <ScrollView>
      <ImageBackground
        style={{
          height: hp(21),
          paddingHorizontal: wp(3),
          paddingBottom: hp(8),
          marginBottom: hp(1),
          justifyContent: 'flex-end',
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
        resizeMode="stretch"
        source={require('_assets/images/header.png')}>
        <Header {...props} title={'Change Password'} />
      </ImageBackground>
      <Screen>
        <View key="header"></View>
        <View key="content">
          <InputWithLabel
            name="oldPassword"
            placeholder="*************"
            label="Password:"
            value={state.oldPassword}
            onChangeText={(val) => setStateHandler('old_password', val)}
          />
          <InputWithLabel
            name="newPassword"
            placeholder="*************"
            label="New Password:"
            value={state.oldPassword}
            onChangeText={(val) => setStateHandler('password', val)}
          />
          <InputWithLabel
            name="password_confirmation"
            placeholder="*************"
            label="Confirm New Password:"
            value={state.oldPassword}
            onChangeText={(val) =>
              setStateHandler('password_confirmation', val)
            }
          />
        </View>
        <View key="footer">
          <Button
            appColor
            bold
            color={colors.white}
            onPress={() => passChange()}>
            Save
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default ChangePassword;
