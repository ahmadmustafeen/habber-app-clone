import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { InputWithLabel } from '_components';
import { Button, Screen } from '_components/common';
// import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { UPDATE_PASSWORD } from 'redux/actionTypes';

const ChangePassword = (props) => {
  const { navigate } = props.navigation;
  const { colors } = useTheme()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const passChange = () => {
    dispatch(withDataActions(state, UPDATE_PASSWORD));
    // navigate(MY_PROFILE)
  }
  return (
    <ScrollView>
      <Header {...props} title={'Change Password'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <InputWithLabel name="oldPassword" placeholder="*************" label="Password:" value={state.oldPassword} onChangeText={(val) => setStateHandler('old_password', val)} />
          <InputWithLabel name="newPassword" placeholder="*************" label="New Password:" value={state.oldPassword} onChangeText={(val) => setStateHandler('password', val)} />
          <InputWithLabel
            name="password_confirmation"
            placeholder="*************"
            label="Confirm New Password:"
            value={state.oldPassword}
            onChangeText={(val) => setStateHandler('password_confirmation', val)}
          />
        </View>
        <View key="footer">
          <Button appColor bold color={colors.white} onPress={() => passChange()}>
            Save
        </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default ChangePassword;
