import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {InputWithLabel} from '../../components';
import {AppText, Screen, Button} from '../../components/common';

import {Color} from '../../constants/Colors';
import {FORGOT_PASSWORD_SCREEN, SIGNUP_SCREEN} from '../../constants/Screens';

const SignIn = (props) => {
  const {navigate} = props.navigation;
  return (
    <ImageBackground
      style={styles.bgImage}
      resizeMode="stretch"
      source={require('../../assets/images/background.jpg')}>
      <Screen>
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
      </Screen>
    </ImageBackground>
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
