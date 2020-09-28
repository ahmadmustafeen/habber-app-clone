/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {connect} from 'react-redux';
import {MainNav} from './MainNav';

import AdScreen from '../containers/AdScreen';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Splash from '../containers/Splash';
import DrawerMenu from '../containers/DrawerMenu';
import Language from '../containers/Language';
import ForgotPassword from '../containers/ForgotPassword';

import {
  FORGOT_PASSWORD_SCREEN,
  LANGUAGE_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  AD_SCREEN,
} from '../constants/Screens';

const Drawer = createDrawerNavigator();
const AuthScreen = createStackNavigator();
const RootStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    appColor: '#014488',
    primary: 'brown',
    secondary: 'white',
    silver: 'silver',
    warmGray: '#939393',
    background: '#e8e8e8',
    textBlack: '#3B3B3B',
  },
};

class Navigator extends Component {
  state = {
    loading: true,
  };

  componentDidMount = async () => {
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000),
    ).then(() => this.setState({loading: false}));
  };

  render() {
    return (
      <NavigationContainer theme={MyTheme}>
        {this.state.loading ? (
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Splash" component={Splash} />
          </RootStack.Navigator>
        ) : false ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={() => <DrawerMenu />}
            drawerBackgroundColor="transparent">
            <Drawer.Screen name="Main" component={MainNav} />
          </Drawer.Navigator>
        ) : (
          <AuthScreen.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthScreen.Screen name={AD_SCREEN} component={AdScreen} />
            <AuthScreen.Screen name={LANGUAGE_SCREEN} component={Language} />
            <AuthScreen.Screen name={SIGNIN_SCREEN} component={SignIn} />
            <AuthScreen.Screen name={SIGNUP_SCREEN} component={SignUp} />

            <AuthScreen.Screen
              name={FORGOT_PASSWORD_SCREEN}
              component={ForgotPassword}
            />
          </AuthScreen.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default Navigator;
