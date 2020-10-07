import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {InputWithLabel, RoundIcon} from '_components';
import {AppText, BackgroundImage, Button} from '_components/common';

import {Color} from '_constants/Colors';
import {
  FORGOT_PASSWORD_SCREEN,
  MY_PROFILE,
  SIGNUP_SCREEN,
} from '_constants/Screens';

const SignIn = (props) => {
  const {navigate} = props.navigation;
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold style={styles.hellotxt}>
          Hello !
        </AppText>
        <AppText secondary style={{marginBottom: 10}}>
          Sign in to your account
        </AppText>
      </View>
      <View key="content" style={styles.content}>
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
        />
        <AppText
          underline
          style={styles.forgotPassword}
          size={18}
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          Forgot Password
        </AppText>
        <Button round onPress={() => navigate('Home')}>
          SIGN IN
        </Button>

        <AppText
          underline
          style={styles.createAccount}
          onPress={() => navigate(SIGNUP_SCREEN)}>
          Create New Account
        </AppText>
        <AppText
          style={{textAlign: 'center', marginBottom: 10}}
          secondary
          onPress={() => navigate(SIGNUP_SCREEN)}>
          {`OR

Login with Social media account`}
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
        </View>
      </View>
      <View key="footer">
        <AppText
          style={{
            textAlign: 'right',
            textDecorationLine: 'underline',
            color: '#c27e12',
            fontSize: 25,
          }}
          onPress={() => navigate('Home')}>
          Skip
        </AppText>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
  },
  hellotxt: {
    color: '#c27e12',
    fontSize: 35,
    marginTop: 30,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#c27e12',
    marginBottom: 20,
  },
  createAccount: {
    textAlign: 'center',
    color: '#c27e12',
    marginTop: 20,
    marginBottom: 20,
  },
});
export default SignIn;
