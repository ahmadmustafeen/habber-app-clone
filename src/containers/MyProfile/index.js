import React from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {AppText, Button, Screen} from '_components/common';
import {HorizontalRow} from '_components/HorizontalRow';
import {Header} from '_components/Header';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  MY_ADDRESS_BOOK,
} from '_constants/Screens';
const MyProfile = (props) => {
  const {navigate} = props.navigation;
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
        <View style={styles.btnview}>
          <Button
            fontSize={17}
            appColor
            style={{marginBottom: 15}}
            onPress={() => navigate(MY_ADDRESS_BOOK)}>
            MY ADDRESS BOOK
          </Button>
          <Button
            fontSize={17}
            appColor
            onPress={() => navigate(CHANGE_PASSWORD)}>
            CHANGE PASSWORD
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
  txt: {
    marginLeft: 10,
    marginTop: 20,
  },
  btnview: {
    paddingHorizontal: 30,
    marginTop: 40,
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
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default MyProfile;
