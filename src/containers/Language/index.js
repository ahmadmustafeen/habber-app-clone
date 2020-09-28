import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {SIGNIN_SCREEN} from '../../constants/Screens';

const Language = (props) => {
  const {navigate} = props.navigation;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Screenshot_Logo.jpg')}
        />
      </View>
      <AppText primary>Select Your Language</AppText>
      <Button round background="white" onPress={() => navigate(SIGNIN_SCREEN)}>
        English
      </Button>
      <Button round background="white" onPress={() => navigate(SIGNIN_SCREEN)}>
        عربى
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    width: '60%',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default Language;
