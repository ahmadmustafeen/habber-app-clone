import React from 'react';
import {View, StyleSheet} from 'react-native';
import {InputWithLabel} from '../../components';
import { Button,Screen} from '../../components/common';
import { MY_PROFILE } from '../../constants/Screens';
const ChangePassword = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel placeholder="*************" label="Password:"/>
        <InputWithLabel placeholder="*************" label="New Password:"/>
        <InputWithLabel placeholder="*************" label="Confirm New Password:"/>
      </View>
      <View key="footer">
            <Button color="white" onPress={() => navigate(MY_PROFILE)}>
              Save
            </Button>
      </View>
      </Screen>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
});

export default ChangePassword;
