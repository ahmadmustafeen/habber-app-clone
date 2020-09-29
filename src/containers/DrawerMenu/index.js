import React, {useState} from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import {AppText,Button, Screen} from '../../components/common';
import {RoundIcon} from '../../components';

import {Color} from '../../constants/Colors';

const DrawerMenu = (props) => {
  return (
    <Screen backgroundColor='#005f69'>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Screenshot_Logo.jpg')}
        />
        <Text style={{color:'white',marginTop:40,fontSize: 18}}>Khaled Ammar</Text>
        </View>
        <View>
        <AppText style={styles.navbtn}>
          Home
        </AppText>
        <AppText style={styles.navbtn}>
          Profile
        </AppText>
        <AppText style={styles.navbtn}>
          Favorites
        </AppText>
        <AppText style={styles.navbtn}>
          My orders
        </AppText>
        <AppText style={styles.navbtn}>
          About us
        </AppText>
        <AppText style={styles.navbtn}>
          Contact us
        </AppText>
        <AppText style={styles.navbtn}>
          Settings
        </AppText>
        <AppText secondary style={{fontSize: 18,marginTop: 30,marginBottom: 20}}>Powered By Line</AppText>
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
  content:{
    marginTop: 20,
  },
  navbtn:{
    backgroundColor:'transparent',
    borderBottomColor: '#c27e12',
    paddingVertical:12,
    color:'white',
    alignItems: 'flex-start',
    borderBottomWidth: 0.3,
    fontWeight: 'bold' 
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: 400/ 2
  },
});
export default DrawerMenu;
