import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
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
    <View>
      <Image
        style={styles.Image}
        resizeMode="stretch"
        source={require('../../assets/images/splash.png')}
      />
    </View>

  );
};
const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: '100%',
  },
});
export default Splash;
