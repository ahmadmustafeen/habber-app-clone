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

const Checkout = (props) => {
  const { navigate } = props.navigation;
  return (
    <ScrollView>
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

        <Header {...props} title={'Checkout'} />


      </ImageBackground>
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.addressbookview}>
            <AppText bold style={{ paddingStart: 10, paddingVertical: 10 }}>
              Select Payment Option
            </AppText>
            <View style={styles.addressbook}>
              <View style={styles.addressbookimg}>
                <Image
                  style={styles.img}
                  source={require('_assets/images/onlinepayment.png')}></Image>
              </View>
              <AppText size={16}>Online Payment</AppText>
            </View>
            <View style={styles.addressbook}>
              <View style={styles.addressbookimg}>
                <Image
                  style={styles.img}
                  source={require('_assets/images/cash.png')}></Image>
              </View>

              <AppText size={16}>Cash On Delivery</AppText>
            </View>
          </View>
          <HorizontalRow />
          <View style={styles.addressbookview}>
            <AppText bold style={{ paddingStart: 10, paddingVertical: 10 }}>
              Deliver To:
            </AppText>
            <View style={styles.addressbook}>
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
              bold
              onPress={() => navigate(ADD_NEW_ADDRESS)}>
              ADD NEW ADDRESS
            </Button>
            <Button
              fontSize={17}
              secondary
              color={'white'}
              bold
              onPress={() => navigate(ADD_NEW_ADDRESS)}>
              PAY NOW
            </Button>
          </View>
        </View>
      </Screen>
    </ScrollView>
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
    // marginLeft: 15,
    backgroundColor: 'red',
  },
  addressbook: {
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: 'rgb(221, 221, 221)',
    alignItems: 'center',
    borderWidth: 2.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    width: wp(90),
    // paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 30,
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
  addressbookimg: {
    width: wp(10),
    aspectRatio: 1,
    marginRight: wp(10),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Checkout;
