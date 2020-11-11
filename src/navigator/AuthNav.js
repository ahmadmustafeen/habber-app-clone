/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AdScreen from '../containers/AdScreen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Language from '../containers/Language';
import ForgotPassword from '../containers/ForgotPassword';

import {
  FORGOT_PASSWORD_SCREEN,
  LANGUAGE_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  AD_SCREEN,
} from '../constants/Screens';
const AuthScreen = createStackNavigator();
export const AuthNav = () => {
  return (
    <AuthScreen.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthScreen.Screen name={LANGUAGE_SCREEN} component={Language} />
      <AuthScreen.Screen name={SIGNIN_SCREEN} component={SignIn} />
      <AuthScreen.Screen name={SIGNUP_SCREEN} component={SignUp} />
      <AuthScreen.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
    </AuthScreen.Navigator>
  );
};
