/* eslint-disable prettier/prettier */
import React, { forwardRef, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Splash from '../containers/Splash';
import { AuthNav } from './AuthNav';
import DrawerMenu from '../containers/DrawerMenu';
import { DashboardNav } from './DashboardNav';
import { shallowEqual, useSelector } from 'react-redux';
import { AD_SCREEN, LANGUAGE_SCREEN } from '../constants/Screens';
import AdScreen from '../containers/AdScreen';
import linking from './Linking'
import Language from '../containers/Language';
import AsyncStorage from '@react-native-community/async-storage';
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
      drawerStyle={{ backgroundColor: 'transparent', width: '90%' }}
      drawerType="front">
      <Drawer.Screen name="Main" component={DashboardNav} />
    </Drawer.Navigator>
  );
};
const navigatorComponent = (splashScreen, ad, backUser, res) => {
  console.log(res);

  if (splashScreen) {
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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
        <RootStack.Screen name={AD_SCREEN} component={AdScreen} initialParams={{ image: res.image }} />
      </RootStack.Navigator>
    );
  }
  if (!backUser) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={LANGUAGE_SCREEN} component={Language} />
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
const config = {
  screens: {
    HOME: {
      path: "home/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
    Profile: {
      path: "profile/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
    Notifications: "notifications",
    Settings: "settings",
  },
};

const Navigator = (props, ref) => {
  const [existingUser, setExistingUser] = useState("")

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('@userProfile');
      const value = JSON.parse(valueString);
      // setData(value);
      setExistingUser(!!value.language)
      console.log("ANSWER", value)
    } catch (error) {
      console.log(error);
    }
  };





  const { splashScreen, ad, backUser, UserProfileReducer, res } = useSelector(({ SplashReducer, UserProfileReducer }) => {
    return {
      splashScreen: SplashReducer.splashScreen,
      ad: SplashReducer.ad,
      res: SplashReducer.res,
      UserProfileReducer: UserProfileReducer,
      backUser: !!UserProfileReducer.language,
    };
  }, shallowEqual);
  console.log("Navigator Splash backuser", backUser);
  return (
    <NavigationContainer linking={linking} ref={ref} theme={MyTheme}>
      {navigatorComponent(splashScreen, ad, existingUser, res)}
    </NavigationContainer>
  );
};

export default forwardRef(Navigator);
