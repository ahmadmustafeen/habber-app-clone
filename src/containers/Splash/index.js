import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';

const Splash = (props) => {
  console.log("Hello From Habber");
  return (
    <Image
      style={styles.Image}
      resizeMode="stretch"
      source={require('../../assets/images/background.jpg')}
    />
  );
};
const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: '100%',
  },
});
export default Splash;
