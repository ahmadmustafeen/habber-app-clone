import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {InputWithLabel} from '../../components';
import { Button,Screen} from '../../components/common';
const AddNewAddress = (props) => {
  const {navigate} = props.navigation;
  return (
    <Screen>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel placeholder="Country*" required/>
        <InputWithLabel placeholder="State*" required/>
        <InputWithLabel placeholder="City*" required/>
        <InputWithLabel placeholder="Address Line 1*" required/>
        <InputWithLabel placeholder="Address Line 2*" required/>
        <InputWithLabel placeholder="Postal Code*" required/>
        <InputWithLabel placeholder="Mobile Number*" required/>
      </View>
      <View key="footer">
            <Button color="white" onPress={() => navigate(JOINUS)}>
              Add Address
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

export default AddNewAddress;
