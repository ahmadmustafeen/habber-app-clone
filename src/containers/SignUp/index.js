import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { useDispatch } from 'react-redux';

import {InputWithLabel, RoundIcon, ModalScreen} from '_components';
import {BackgroundImage, Button, AppText} from '_components/common';
import {signUp} from '_assets/data/StaticData';
import {withDataActions} from '_redux/actions/basicActions';
import {SIGN_UP} from 'redux/actionTypes';
import useModal from 'utils/customHooks/useModal';
import {validateEmail, validatePassword} from 'helpers/Validators';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const {navigate} = props.navigation;
  const {visible, toggleModal} = useModal();

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const {first_name, last_name, email, password, password_confirmation} = state;

  const handleChange = (key, value) => {
    setState((state) => ({...state, [key]: value}));
  };

  const onSignUp = () => {
    dispatch(withDataActions(state, SIGN_UP));
  };

  return (
    <BackgroundImage>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel
          style={styles.inputfield}
          placeholder="Khaled"
          label="First Name"
          required
          value={first_name}
          onChangeText={(value) => handleChange('first_name', value)}
        />
        <InputWithLabel
          placeholder="Ammar"
          label="Last Name"
          required
          value={last_name}
          onChangeText={(value) => handleChange('last_name', value)}
        />
        <InputWithLabel
          placeholder="ahmadalajmi@gmail.com"
          label="Email"
          required
          value={email}
          onChangeText={(value) => handleChange('email', value)}
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
          required
          value={password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Confirm Password"
          required
          value={password_confirmation}
          onChangeText={(value) => handleChange('password_confirmation', value)}
        />
        <View style={{alignItems: 'center'}}>
          <AppText white secondary size={17}>
            {signUp.agreement}
          </AppText>
          <AppText underline style={styles.termsandservices} size={17}>
            {signUp.TermsAndPolicies}
          </AppText>
          <Button
            round
            width="60%"
            onPress={() =>
              first_name &&
              last_name &&
              validateEmail(email) &&
              validatePassword(password) &&
              validatePassword(password_confirmation)
                ? onSignUp()
                : Alert.alert("Please fill the forms")
            }>
            {signUp.sign_up}
          </Button>
        </View>
        {/* <AppText white secondary style={{marginTop: 10, marginBottom: 10}}>
            OR
          </AppText> 
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundIcon
            name="sc-facebook"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="google"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="sc-twitter"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
        </View> */}
        <ModalScreen
          visible={visible}
          onContinue={toggleModal}
          {...signUp.modalData}
        />
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
  },
  termsandservices: {
    color: '#c27e12',
    marginTop: 5,
    marginBottom: 25,
  },
});

export default SignUp;
