/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import AdScreen from '../containers/AdScreen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import DrawerMenu from '../containers/DrawerMenu';
import JoinUs from '../containers/JoinUs';
import RequestBooks from '../containers/RequestBooks';
import Language from '../containers/Language';
import ForgotPassword from '../containers/ForgotPassword';
import MyProfile from '../containers/MyProfile';
import MyAddressBook from '../containers/MyAddressBook';
import AddNewAddress from '../containers/AddNewAddress';
import ChangePassword from '../containers/ChangePassword';
import EditProfile from '../containers/EditProfile';

import {
  FORGOT_PASSWORD_SCREEN,
  LANGUAGE_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  AD_SCREEN,
  DRAWERMENU,
  JOINUS,
  REQUESTBOOKS,
  MY_PROFILE,
  MY_ADDRESS_BOOK,
  ADD_NEW_ADDRESS,
  CHANGE_PASSWORD,
  EDIT_PROFILE
} from '../constants/Screens';
const AuthScreen = createStackNavigator();
export const AuthNav = () => {
  return (
    <AuthScreen.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthScreen.Screen name={AD_SCREEN} component={AdScreen} />
      <AuthScreen.Screen name={LANGUAGE_SCREEN} component={Language} />
      <AuthScreen.Screen name={SIGNIN_SCREEN} component={SignIn} />
      <AuthScreen.Screen name={SIGNUP_SCREEN} component={SignUp} />
      <AuthScreen.Screen name={DRAWERMENU} component={DrawerMenu} />
      <AuthScreen.Screen name={JOINUS} component={JoinUs} />
      <AuthScreen.Screen name={REQUESTBOOKS} component={RequestBooks} />
      <AuthScreen.Screen name={MY_PROFILE} component={MyProfile} />
      <AuthScreen.Screen name={MY_ADDRESS_BOOK} component={MyAddressBook} />
      <AuthScreen.Screen name={ADD_NEW_ADDRESS} component={AddNewAddress} />
      <AuthScreen.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <AuthScreen.Screen name={EDIT_PROFILE} component={EditProfile} />

      <AuthScreen.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPassword}
      />
    </AuthScreen.Navigator>
  );
};
