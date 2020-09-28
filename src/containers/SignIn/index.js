import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {InputWithLabel, SocialIcon} from '../../components';
import {AppText, BackgroundImage, Button} from '../../components/common';

import {Color} from '../../constants/Colors';
import {FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN} from '../../constants/Screens';

const SignIn = (props) => {
  const {navigate} = props.navigation;
  return (
    <BackgroundImage>
      <View key="header">
        <AppText bold heading primary>
          Hello !
        </AppText>
        <AppText secondary>Sign in to your account</AppText>
      </View>
      <View key="content">
        <InputWithLabel placeholder="ahmadalajmi@gmail.com" label="Email" />
        <InputWithLabel
          secureTextEntry
          placeholder="*********"
          label="Password"
        />
        <AppText
          underline
          style={styles.forgotPassword}
          primary
          size={15}
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          Forgot Password
        </AppText>
        <Button>SIGN IN</Button>

        <AppText
          primary
          underline
          style={styles.createAccount}
          onPress={() => navigate(SIGNUP_SCREEN)}>
          Create New Account
        </AppText>
        <AppText
          style={{textAlign: 'center'}}
          secondary
          onPress={() => navigate(SIGNUP_SCREEN)}>
          {`OR

Login with Social media account`}
        </AppText>
        <SocialIcon />
      </View>
      <View key="footer">
        <AppText
          style={{
            textAlign: 'right',
            textDecorationLine: 'underline',
          }}
          primary
          onPress={() => navigate(FORGOT_PASSWORD_SCREEN)}>
          Skip
        </AppText>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  createAccount: {
    textAlign: 'center',
  },
});
export default SignIn;
