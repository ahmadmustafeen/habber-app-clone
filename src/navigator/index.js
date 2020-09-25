/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

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
import {ForgotPassword, ResetPassword} from '../containers/Password';

import {
  FORGOT_PASSWORD_SCREEN,
  LANGUAGE_SCREEN,
  SIGNIN_SCREEN,
  SIGNUP_SCREEN,
  AD_SCREEN,
  SIGNUP_SUCCESSFUL_SCREEN,
  RESET_PASSWORD_SCREEN,
} from '../constants/Screens';
import SignUpSuccesful from '../containers/SignUp/SignUpSuccesful';

const Drawer = createDrawerNavigator();
const AuthScreen = createStackNavigator();
const RootStack = createStackNavigator();

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
      <NavigationContainer>
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
              name={SIGNUP_SUCCESSFUL_SCREEN}
              component={SignUpSuccesful}
            />
            <AuthScreen.Screen
              name={FORGOT_PASSWORD_SCREEN}
              component={ForgotPassword}
            />
            <AuthScreen.Screen
              name={RESET_PASSWORD_SCREEN}
              component={ResetPassword}
            />
          </AuthScreen.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default Navigator;
