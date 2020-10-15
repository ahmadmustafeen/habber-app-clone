import React from 'react';
import {View, ScrollView} from 'react-native';
import {InputWithLabel} from '_components';
import {Button, Screen} from '_components/common';
import {MY_PROFILE} from '_constants/Screens';
import {Header} from '_components/Header';
const AddNewAddress = (props) => {
  const {navigate} = props.navigation;
  return (
    <ScrollView>
    <Header {...props} title={'Add New Address'} />
    <Screen>
      <View key="header"></View>
      <View key="content">
        <InputWithLabel placeholder="Country*" required />
        <InputWithLabel placeholder="State*" required />
        <InputWithLabel placeholder="City*" required />
        <InputWithLabel placeholder="Address Line 1*" required />
        <InputWithLabel placeholder="Address Line 2*" required />
        <InputWithLabel placeholder="Postal Code*" required />
        <InputWithLabel placeholder="Mobile Number*" required />
      </View>
      <View key="footer">
        <Button primary onPress={() => navigate(MY_PROFILE)}>
          Add Address
        </Button>
      </View>
    </Screen>
    </ScrollView>
  );
};

export default AddNewAddress;
