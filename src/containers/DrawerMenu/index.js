import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {AppText, Screen} from '../../components/common';
import {RoundIcon} from '../../components';
import {
  SETTINGS_SCREEN,
  ABOUT_US,
  CONTACT_US,
  FAVORITES,
  MY_ORDERS,
  MY_PROFILE,
} from '../../constants/Screens';

const DrawerMenu = (props) => {
  return (
    <Screen backgroundColor="#005f69">
      <View key="header"></View>
      <View key="content">
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Screenshot_Logo.jpg')}
            />
          </View>
          <AppText white bold size={15} style={styles.txt}>
            Khaled Ammar
          </AppText>
        </View>
        <View>
          <AppText bold white style={styles.navbtn}>
            Home
          </AppText>
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(MY_PROFILE)}>
            Profile
          </AppText>
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(FAVORITES)}>
            Favorites
          </AppText>
          <AppText bold white style={styles.navbtn}
          onPress={() => props.navigation.navigate(MY_ORDERS)}>
            My orders
          </AppText>
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(ABOUT_US)}>
            About us
          </AppText>
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(CONTACT_US)}>
            Contact us
          </AppText>
          <AppText
            bold
            white
            style={styles.navbtn}
            white
            bold
            onPress={() => props.navigation.navigate(SETTINGS_SCREEN)}>
            Settings
          </AppText>
          <AppText secondary size={18} white style={styles.poweredbyline}>
            Powered By Line
          </AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <RoundIcon
            name="snapchat"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="instagram"
            type="font-awesome"
            color="#fff"
            onPress={() => console.log('hello')}
          />
          <RoundIcon
            name="sc-twitter"
            type="evilicon"
            color="#fff"
            onPress={() => console.log('hello')}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  navbtn: {
    borderBottomColor: '#c27e12',
    paddingVertical: 12,
    alignItems: 'flex-start',
    borderBottomWidth: 0.3,
  },
  txt: {
    marginLeft: 10,
    marginTop: 30,
  },
  imgContainer: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  poweredbyline: {
    marginTop: 30,
    marginBottom: 20,
  },
});
export default DrawerMenu;
