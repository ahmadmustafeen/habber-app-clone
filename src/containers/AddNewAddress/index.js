import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { InputWithLabel } from '_components';
import { Button, Screen } from '_components/common';
import { MY_PROFILE } from '_constants/Screens';
import { Header } from '_components/Header';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { ADD_ADDRESS_SAGA } from '_redux/actionTypes';
import { addressSaga } from 'redux/sagas/AddressSaga';

const AddNewAddress = (props) => {
  const [state, setState] = useState({
    address_name: "",
    country_id: "3",
    state: "",
    city: "",
    address_line1: "",
    address_line2: "",
    phone: "",
    post_code: "",
  })
  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const dispatch = useDispatch()
  const AddAddress = () => {
    dispatch(withDataActions(state, ADD_ADDRESS_SAGA))

  }
  const { navigate } = props.navigation;
  return (
    <ScrollView>
      <Header {...props} title={'Add New Address'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <InputWithLabel value={state.address_name} placeholder="Address Name*" required onChangeText={(val) => setStateHandler("address_name", val)} />
          <InputWithLabel placeholder="Country*" required />
          <InputWithLabel value={state.state} placeholder="State/Governate*" required onChangeText={(val) => setStateHandler("state", val)} />
          <InputWithLabel value={state.city} placeholder="City*" required onChangeText={(val) => setStateHandler("city", val)} />
          <InputWithLabel value={state.address_line1} placeholder="Address Line 1*" required onChangeText={(val) => setStateHandler("address_line1", val)} />
          <InputWithLabel value={state.address_line2} placeholder="Address Line 2*" required onChangeText={(val) => setStateHandler("address_line2", val)} />
          <InputWithLabel value={state.post_code} placeholder="Postal Code*" required onChangeText={(val) => setStateHandler("post_code", val)} />
          <InputWithLabel value={state.phone} placeholder="Mobile Number*" required onChangeText={(val) => setStateHandler("phone", val)} />
        </View>
        <View key="footer">
          <Button primary onPress={() => AddAddress()}>
            Add Address
        </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

export default AddNewAddress;
