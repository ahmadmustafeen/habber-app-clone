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
import { Alert } from 'react-native';
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
const navigatorComponent = (ad, backUser, res, User, adViewed) => {
  // Alert.alert("navigatorComponent")

  // return (
  //   <RootStack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}>
  //     {!backUser && <RootStack.Screen name={LANGUAGE_SCREEN} component={Language} />}
  //     {(ad && !adViewed) && <RootStack.Screen name={AD_SCREEN} component={AdScreen} initialParams={{ image: res.image }} />}
  //     {(!User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}
  //     <RootStack.Screen name="Drawer" component={DrawerNav} />
  //     {(User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}


  //   </RootStack.Navigator>
  // );




  // if (!splashScreen) {
  //   return (
  //     <RootStack.Navigator screenOptions={{ headerShown: false }}>
  //       <RootStack.Screen name="Splash" component={Splash} />
  //     </RootStack.Navigator>
  //   );
  // }

  if (ad && !User.setting) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={AD_SCREEN} component={AdScreen} initialParams={{ image: res.image }} />
      </RootStack.Navigator>
    );
  }
  else
    if (backUser) {
      console.log("BackUser", User, "BackUser")

      if (User.setting) {

        return (
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {/* {(!User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}
        <RootStack.Screen name="Drawer" component={DrawerNav} />
        {(User.token) && <RootStack.Screen name="Auth" component={AuthNav} />} */}

            {(!User.setting) && <RootStack.Screen name="Auth" component={AuthNav} />}
            <RootStack.Screen name="Drawer" component={DrawerNav} />
            {(User.setting) && <RootStack.Screen name="Auth" component={AuthNav} />}

          </RootStack.Navigator>
        );

      }
      else {
        return (
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {/* {(!User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}
        <RootStack.Screen name="Drawer" component={DrawerNav} />
        {(User.token) && <RootStack.Screen name="Auth" component={AuthNav} />} */}

            {(!User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}
            <RootStack.Screen name="Drawer" component={DrawerNav} />
            {(User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}

          </RootStack.Navigator>
        );
      }
    }
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={LANGUAGE_SCREEN} component={Language} />
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
  const [User, setUser] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [adUrl, setAdUrl] = useState("")
  const [adViewed, setAdViewed] = useState("")

  useEffect(() => {
    // retrieveData2().then(
    Add().then(() => retrieveData().then(() => retrieveData2().then(() => setLoaded(true)))

    )
  }, []);

  const Add = async () => {
    try {
      let response = await fetch(
        'https://line-kw.com/hebr.line-kw.com/public/api/v1/ads'
      );
      let json = await response.json();
      setAdUrl(json?.data)
    } catch (error) {
      console.error(error);
    }
  };


  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('@userProfile');
      const value = JSON.parse(valueString);
      setLanguage_presence(!backUser)
      // const valueAddString = await AsyncStorage.getItem('@adViewed');
      // const valueAdd = JSON.parse(valueAddString);
      // setData(value);
      setExistingUser(!!value.language)
      // setAdViewed(!!value.language && !valueAdd.adViewed)
      setUser(value)
    } catch (error) {
      console.log(error);
    }
  };
  const [language_presence, setLanguage_presence] = useState(true)
  const retrieveData2 = async () => {
    try {
      // const valueString = await AsyncStorage.getItem('@userProfile');
      // const value = JSON.parse(valueString);

      const valueAddString = await AsyncStorage.getItem('@adViewed');
      const valueAdd = JSON.parse(valueAddString);
      // setData(value);
      // setExistingUser(!!value.language)
      console.log("NEW VALUE OF ADD", valueAdd)
      setAdViewed(valueAdd)
      // setUser(value)
      // console.log("ANSWER", value)
    } catch (error) {
      console.log(error);
    }
  };




  const { ad, backUser, UserProfileReducer, res } = useSelector(({ SplashReducer, UserProfileReducer }) => {
    return {
      // splashScreen: SplashReducer.splashScreen,
      ad: existingUser ? SplashReducer.ad : false,
      res: SplashReducer.res,
      UserProfileReducer: UserProfileReducer,
      backUser: !!UserProfileReducer.language,
    };
  }, shallowEqual);
  // var language_presence = UserProfileReducer.language_presence

  return (
    <NavigationContainer linking={linking} ref={ref} theme={MyTheme}>

      {/* <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {language_presence && <RootStack.Screen name={LANGUAGE_SCREEN} component={Language} />}
        {(ad && !adViewed) && <RootStack.Screen name={AD_SCREEN} component={AdScreen} initialParams={{ image: res.image }} />}
        {(!User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}
        <RootStack.Screen name="Drawer" component={DrawerNav} />
        {(User.token) && <RootStack.Screen name="Auth" component={AuthNav} />}


      </RootStack.Navigator> */}

      {
        loaded ?
          navigatorComponent((res && existingUser), existingUser, adUrl, User, adViewed)
          : null
      }
    </NavigationContainer>
  );
};

export default forwardRef(Navigator);
