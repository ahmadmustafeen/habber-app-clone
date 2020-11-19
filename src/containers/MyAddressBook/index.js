import React from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, I18nManager } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { ADD_NEW_ADDRESS, EDIT_PROFILE } from '_constants/Screens';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MyAddressBook = (props) => {
  const { navigate } = props.navigation;
  return (
    <Screen noPadding>

      <View key="header">
        <ImageBackground
          style={{
            height: hp(21),
            paddingHorizontal: wp(3),
            paddingBottom: hp(8),
            marginBottom: hp(1),
            justifyContent: 'flex-end',
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
          resizeMode='stretch'
          source={require('_assets/images/header.png')}>

          <Header {...props} title={'My Address Book'} />


        </ImageBackground>
      </View>
      <View key="content">
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('_assets/images/Screenshot_Logo.jpg')}
            />
          </View>
          <AppText bold size={15} style={styles.txt}>
            {`Khaled Ammar
Khaled.Ammar@gmail.com`}
          </AppText>
          <AppText
            size={17}
            center
            appColor
            onPress={() => navigate(EDIT_PROFILE)}
            style={styles.editbtn}>
            Edit
          </AppText>
        </View>
        <HorizontalRow />
        <View style={styles.addressbookview}>
          <View style={styles.addressbook}>
            <AppText size={17} style={styles.addressbookheading}>
              MY ADDRESS BOOK
            </AppText>
            <HorizontalRow />
            <View>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Bae's Home
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Work
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Bae's Home
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Other
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
            </View>
          </View>
          <Button
            fontSize={17}
            primary
            onPress={() => navigate(ADD_NEW_ADDRESS)}>
            ADD NEW ADDRESS
          </Button>
        </View>
      </View>
    </Screen>

  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 100,
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
  editbtn: {
    backgroundColor: '#c27e12',
    width: 100,
    height: 30,
    position: 'absolute',
    right: 10,
    top: -10,
    color: 'black',
    borderRadius: 400 / 2,
  },
  txt: {
    marginLeft: 10,
    marginTop: 20,
  },
  addressbookheading: {
    marginBottom: 15,
    marginLeft: 15,
  },
  addressbook: {
    borderRadius: 5,
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 2.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
});

export default MyAddressBook;
