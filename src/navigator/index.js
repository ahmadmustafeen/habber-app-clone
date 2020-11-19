/* eslint-disable prettier/prettier */
import React, {forwardRef, useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Splash from '../containers/Splash';
import {AuthNav} from './AuthNav';
import DrawerMenu from '../containers/DrawerMenu';
import {DashboardNav} from './DashboardNav';
import {shallowEqual, useSelector} from 'react-redux';
import {AD_SCREEN} from 'constants/Screens';
import AdScreen from 'containers/AdScreen';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    appColor: '#014488',
    primary: '#c27e12',
    secondary: '#010A2A',
    white: 'white',
    border: '#939393',
    background: 'white',
    textBlack: '#3B3B3B',
    placeholder: '#939393',
    borderColor: 'rgb(200,200,200)',
    imageLoadingColor: '#2196F3',
  },
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerMenu {...props} />}
      statusBarAnimation="fade"
      drawerStyle={{backgroundColor: 'transparent', width: '90%'}}
      drawerType="front">
      <Drawer.Screen name="Main" component={DashboardNav} />
    </Drawer.Navigator>
  );
};
const navigatorComponent = (splashScreen, ad, backUser) => {
  if (splashScreen) {
    return (
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={Splash} />
      </RootStack.Navigator>
    );
  }
  if (ad) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={AD_SCREEN} component={AdScreen} />
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Auth" component={AuthNav} />
      <RootStack.Screen name="Drawer" component={DrawerNav} />
    </RootStack.Navigator>
  );
};
const Navigator = (props, ref) => {
  const {splashScreen, ad, backUser} = useSelector(({SplashReducer}) => {
    return {
      splashScreen: SplashReducer.splashScreen,
      ad: SplashReducer.ad,
      backUser: SplashReducer.backUser,
    };
  }, shallowEqual);
  return (
    <NavigationContainer ref={ref} theme={MyTheme}>
      {navigatorComponent(splashScreen, ad, backUser)}
    </NavigationContainer>
  );
};

export default forwardRef(Navigator);
