/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AdScreen from '../containers/AdScreen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Language from '../containers/Language';
import ForgotPassword from '../containers/ForgotPassword';
import SignUpTermCondition from '../containers/SignUpTermCondition';
import Languagess from '../containers/Languagess'

import {
  FORGOT_PASSWORD_SCREEN,
  LANGUAGE_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  AD_SCREEN,
  SIGNUP_TERM_CODITION,
  RESET_PASSWORD_SCREEN,
  AD_SCREENS

} from '../constants/Screens';
import ResetPassword from '../containers/ResetPassword';
import AdScreens from '../containers/AdScreens';
const AuthScreen = createStackNavigator();
export const AuthNav = () => {
  return (
    <AuthScreen.Navigator

      screenOptions={{
        headerShown: false,
        initialRouteName: 'SIGNIN_SCREEN',
      }}>
      <AuthScreen.Screen name={SIGNIN_SCREEN} component={SignIn} />
      <AuthScreen.Screen name={LANGUAGE_SCREEN} component={Language} />
      <AuthScreen.Screen name={AD_SCREEN} component={AdScreen} />
      <AuthScreen.Screen name={AD_SCREENS} component={AdScreens} />
      <AuthScreen.Screen name={SIGNUP_SCREEN} component={SignUp} />
      <AuthScreen.Screen name={RESET_PASSWORD_SCREEN} component={ResetPassword} />
      <AuthScreen.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
      <AuthScreen.Screen
        name={SIGNUP_TERM_CODITION}
        component={SignUpTermCondition}
      />
    </AuthScreen.Navigator>
  );
};
