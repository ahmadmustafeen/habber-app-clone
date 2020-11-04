import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {AppText, BackgroundImage, Screen} from '../../components/common';
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
    <BackgroundImage source={require('_assets/images/drawer_menu.png')}>
      <View key="header"></View>
      <View key="content">
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/logo.png')}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.imageProfile}>
              <Image
                style={styles.imageAvatar}
                source={require('../../assets/images/Screenshot_Logo.jpg')}
              />
            </View>

            <AppText white bold size={16} style={styles.txt}>
              Khaled Ammar
            </AppText>
          </View>
        </View>
        <View>
          <AppText bold white style={styles.navbtn}>
            Home
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            white
            bold
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(MY_PROFILE)}>
            Profile
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(FAVORITES)}>
            Favorites
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(MY_ORDERS)}>
            My orders
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            bold
            white
            style={styles.navbtn}
            white
            onPress={() => props.navigation.navigate(ABOUT_US)}>
            About us
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(CONTACT_US)}>
            Contact us
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText
            bold
            white
            style={styles.navbtn}
            onPress={() => props.navigation.navigate(SETTINGS_SCREEN)}>
            Settings
          </AppText>
          <View style={styles.Horizontalrow} />
          <AppText secondary size={18} white style={styles.poweredbyline}>
            Powered By Line
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '70%',
          }}>
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
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  navbtn: {
    paddingLeft: 10,
    paddingVertical: 14,
  },
  txt: {
    marginLeft: 10,
  },
  imgContainer: {
    height: 100,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  poweredbyline: {
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProfile: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    aspectRatio: 1,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  imageAvatar: {
    height: '100%',
    width: '100%',
  },
  Horizontalrow: {
    width: '80%',
    borderColor: 'brown',
    borderWidth: 0,
    padding: 1,
    borderBottomWidth: 0.75,
  },
});
export default DrawerMenu;
