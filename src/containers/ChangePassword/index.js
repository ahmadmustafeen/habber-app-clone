import React from 'react';
import {View, StyleSheet} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, Screen} from '_components/common';
import {MY_PROFILE} from '_constants/Screens';
const ChangePassword = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content">
        <InputWithLabel placeholder="*************" label="Password:" />
        <InputWithLabel placeholder="*************" label="New Password:" />
        <InputWithLabel
          placeholder="*************"
          label="Confirm New Password:"
        />
      </View>
      <View key="footer">
        <Button appColor onPress={() => navigate(MY_PROFILE)}>
          Save
        </Button>
      </View>
    </Screen>
  );
};

export default ChangePassword;
