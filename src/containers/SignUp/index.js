import {View, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';

import {InputWithLabel, RoundIcon, ModalScreen} from '../../components';
import {BackgroundImage, Button, AppText} from '../../components/common';
import {signUp} from '../../assets/data/StaticData';
const SignUp = (props) => {
  const {navigate} = props.navigation;

  const onSignUp = () => {
    toggleModal();
  };

  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };
  return (
    <BackgroundImage source={require('../../assets/images/background.jpg')}>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <InputWithLabel style={styles.inputfield} placeholder="Khaled" label="First Name" required/>
        <InputWithLabel placeholder="Ammar" label="Last Name" required/>
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" required/>
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
          required
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Confirm Password"
          required
        />
        <View style={{alignItems: 'center'}}>
          <AppText secondary size={17}>
            {signUp.agreement}
          </AppText>
          <AppText underline style={styles.termsandservices} size={17}>
            {signUp.TermsAndPolicies}
          </AppText>
          <Button round width="60%" onPress={onSignUp}>
            {signUp.sign_up}
          </Button>

          <AppText secondary style={{marginTop: 10,marginBottom: 10}}>OR</AppText>
        </View>
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
          <ModalScreen ref={modalRef} {...signUp.modalData} />
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
  termsandservices:{
    color: '#c27e12',
    marginTop: 5,
    marginBottom: 25,
  }
});

export default SignUp;
