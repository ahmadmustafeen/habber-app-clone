import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppText, Button, BackgroundImage} from '../../components/common';

import {Color} from '../../constants/Colors';
import {SIGNIN_SCREEN} from '../../constants/Screens';

const Language = (props) => {
  const {navigate} = props.navigation;
  return (
    <BackgroundImage>
      <View key="header" style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Screenshot_Logo.jpg')}
        />
      </View>
      <View key="content">
        <AppText style={styles.selecttxt}>Select Your Language</AppText>
        <Button
          style={styles.btn}
          round
          background="white"
          onPress={() => navigate(SIGNIN_SCREEN)}>
          English
        </Button>
        <Button
          round
          background="white"
          onPress={() => navigate(SIGNIN_SCREEN)}>
          عربى
        </Button>
      </View>
    </BackgroundImage>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    marginVertical: 20,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selecttxt: {
    color: '#c27e12',
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  btn: {
    marginBottom: 25,
  },
});
export default Language;
