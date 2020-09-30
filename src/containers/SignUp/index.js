import React, {useState, useRef} from 'react';
import {View} from 'react-native';
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
      <View key="content">
        <InputWithLabel placeholder="Khaled" label="First Name" required />
        <InputWithLabel placeholder="Ammar" label="Last Name" required />
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
        />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Confirm Password"
        />
        <View style={{alignItems: 'center'}}>
          <AppText secondary size={15}>
            {signUp.agreement}
          </AppText>
          <AppText underline primary size={15}>
            {signUp.TermsAndPolicies}
          </AppText>
          <Button round width="60%" onPress={onSignUp}>
            {signUp.sign_up}
          </Button>

          <AppText secondary>OR</AppText>
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
export default SignUp;
