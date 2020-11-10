import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  MY_ADDRESS_BOOK,
} from '_constants/Screens';
const MyProfile = (props) => {
  const { navigate } = props.navigation;
  return (
    <ScrollView>
      <Header {...props} title={'My Profile'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
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

            <AppText
              icon
              size={17}
              appColor
              iconType="entypo"
              iconName="pencil"
              onPress={() => navigate(EDIT_PROFILE)}
              style={styles.editbtn}>
              Edit
          </AppText>


          </View>
          <HorizontalRow style={styles.row} />
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
    // marginTop: 20,
  },
  btnview: {
    marginTop: 30,
  },
  editbtn: {
    backgroundColor: '#c27e12',
    width: 80,
    // height: 30,
    paddingVertical: 5,
    textAlign: 'center',
    // padding: 5,
    position: 'absolute',
    right: 10,
    top: -20,
    color: 'black',
  },
  profiletop: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  row: {
    width: '100%',
    color: 'rgb(200,200,200)'
  }

});

export default MyProfile;
