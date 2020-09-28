import React, {useState} from 'react';
import {View} from 'react-native';
import {InputWithLabel, SocialIcon} from '../../components';
import {BackgroundImage, Button, AppText} from '../../components/common';
import {SIGNUP_SUCCESSFUL_SCREEN} from '../../constants/Screens';

const SignUp = (props) => {
  const {navigate} = props.navigation;
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
            By creating an account you agree to our
          </AppText>
          <AppText underline primary size={15}>
            Terms of Services and Privacy Policy
          </AppText>
          <Button
            round
            width="60%"
            onPress={() => navigate(SIGNUP_SUCCESSFUL_SCREEN)}>
            SIGN UP
          </Button>

          <AppText secondary>OR</AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <SocialIcon
            name="sc-facebook"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <SocialIcon
            name="google"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <SocialIcon
            name="sc-twitter"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};
export default SignUp;
