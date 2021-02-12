import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { withoutDataActions, withDataActions } from '_redux/actions';
import {
  SPLASH_ACTION,
  FETCH_BOOKCLUBS,
} from '_redux/actionTypes';

const Splash = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutDataActions(SPLASH_ACTION))
  }, []);
  return (

    <ImageBackground
      style={{
        height: heightPercentageToDP(100),
        paddingHorizontal: widthPercentageToDP(5),
        paddingBottom: heightPercentageToDP(3),
      }}
      resizeMode="stretch"
      source={require('_assets/images/background.jpg')}>
      <View style={{ height: heightPercentageToDP(70), justifyContent: 'center', alignItems: 'center' }}>

        <View style={styles.imageContainer}>
          <Image
            style={styles.Image}
            source={require('../../assets/images/logo.png')}
          />
        </View>
      </View>

    </ImageBackground>

  );
};
const styles = StyleSheet.create({
  Image: {
    // width: widthPercentageToDP(10),
    // aspectRatio: 1
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    height: heightPercentageToDP(25),
    aspectRatio: 1,
  }
});
export default Splash;
