/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {connect} from 'react-redux';
import {MainNav} from './MainNav';

import About from '../containers/About';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';

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
        resolve('result');
      }, 200),
    ).then(() => this.setState({loading: false}));
  };

  render() {
    return (
      <NavigationContainer>
        {this.state.loading ? (
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Splash" component={About} />
          </RootStack.Navigator>
        ) : true ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={() => (
              <View>
                <Text>Hello From Drawer</Text>
              </View>
            )}
            drawerBackgroundColor="transparent">
            <Drawer.Screen name="Home" component={MainNav} />
          </Drawer.Navigator>
        ) : (
          <AuthScreen.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthScreen.Screen name="login" component={SignIn} />
            <AuthScreen.Screen name="register" component={SignUp} />
          </AuthScreen.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default Navigator;
