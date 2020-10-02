/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Splash from '../containers/Splash';
import {AuthNav} from './AuthNav';
import DrawerMenu from '../containers/DrawerMenu';
import {DashboardNav} from './DashboardNav';

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    appColor: '#014488',
    primary: '#c27e12',
    secondary: 'green',
    white: 'white',
    warmGray: '#939393',
    background: '#e8e8e8',
    textBlack: '#3B3B3B',
  },
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerMenu {...props} />}
      drawerBackgroundColor="transparent">
      <Drawer.Screen name="Main" component={DashboardNav} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 1000),
    ).then(() => setLoading(false));
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      {loading ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Splash" component={Splash} />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Drawer" component={DrawerNav} />
          <RootStack.Screen name="Auth" component={AuthNav} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
