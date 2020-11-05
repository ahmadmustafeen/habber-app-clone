import { validatePhone, validateEmail } from '_helpers/Validators';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { withDataActions } from '_redux/actions';
import { SUBMIT_CONTACT_US } from '_redux/actionTypes';
import { InputWithLabel, Header } from '../../components';
import { Button, Screen } from '../../components/common';

const ContactUs = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

  const setStateHandler = (key, val) => {
    setState({ ...state, [key]: val });
  };
  const validate = () => {
    if (!state.name) {
      Alert.alert('Please Enter Name');
      return false;
    }
    if (!validateEmail(state.email)) {
      Alert.alert('Invalid Email');
      return false;
    }
    if (!state.message) {
      Alert.alert('Please Enter Message');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() && dispatch(withDataActions(state, SUBMIT_CONTACT_US));
  };
  return (
    <View>
      <Header {...props} title={'Contact Us'} />
      <Screen>
        <View key="content" style={styles.content}>
          <InputWithLabel
            style={styles.inputfield}
            placeholder="Name*"
            required
            value={state.name}
            onChangeText={(val) => setStateHandler('name', val)}
          />
          <InputWithLabel
            placeholder="Email*"
            required
            value={state.email}
            onChangeText={(val) => setStateHandler('email', val)}
          />
          <InputWithLabel
            placeholder="Mobile Number (optional)"
            required
            value={state.phone}
            onChangeText={(val) => setStateHandler('phone', val)}
          />
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Message*"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline
            value={state.message}
            onChangeText={(val) => setStateHandler('message', val)}
          />
        </View>
        <View key="footer">
          <Button color="white" onPress={() => { onSubmit() }}>
            Submit
          </Button>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  businesstype: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 3,
    marginVertical: 20,
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default ContactUs;
