import React from 'react';
import {View, ScrollView} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, Screen} from '_components/common';
import {MY_PROFILE} from '_constants/Screens';
import {Header} from '_components/Header';
const ChangePassword = (props) => {
  const {navigate} = props.navigation;
  return (
    <ScrollView>
    <Header {...props} title={'Change Password'} />
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
    </ScrollView>
  );
};

export default ChangePassword;
