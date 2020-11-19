import React from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, I18nManager, TouchableOpacity } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  MY_ADDRESS_BOOK,
} from '_constants/Screens';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
const MyProfile = (props) => {
  const { colors } = useTheme()
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

        <Header {...props} title={'My Profile'} />


      </ImageBackground>
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.profiletop}>
            <View style={[styles.imgContainer, { borderColor: colors.borderColor }]}>
              <Image
                style={styles.image}
                source={require('_assets/images/logo.png')}
              />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <AppText bold size={13} style={styles.txt}>
                {`Khaled Ammar`}
              </AppText>
              <AppText size={13} style={styles.txt}>
                {`Khaled.Ammar@gmail.com`}
              </AppText>
            </View>

            {/* <AppText
              icon
              size={17}
              appColor
              iconType="entypo"
              iconName="pencil"
             
              style={[styles.editbtn, { backgroundColor: colors.primary }]}>
              Edit
          </AppText> */}
            <TouchableOpacity onPress={() => navigate(EDIT_PROFILE)}>
              <Image

                source={require("../../assets/images/editbtn.png")}
              />
            </TouchableOpacity>


          </View>
          <HorizontalRow style={[styles.row, { backgroundColor: colors.borderColor }]} />
          <View style={styles.btnview}>
            <Button
              icon
              fontSize={13}
              appColor
              style={{ marginBottom: 15 }}
              onPress={() => navigate(MY_ADDRESS_BOOK)}>
              MY ADDRESS BOOK
          </Button>
            <Button
              fontSize={13}
              appColor
              icon
              onPress={() => navigate(CHANGE_PASSWORD)}>
              CHANGE PASSWORD
          </Button>
          </View>
        </View>
      </Screen>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    marginLeft: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginLeft: 10,
    marginBottom: 10,
  },
  btnview: {
    marginTop: 30,
  },
  editbtn: {
    width: 80,
    paddingVertical: 5,
    textAlign: 'center',
    position: 'absolute',
    right: 10,
    top: -20,
    color: 'black',
  },
  profiletop: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  row: {
    width: '100%',
  }

});

export default MyProfile;
