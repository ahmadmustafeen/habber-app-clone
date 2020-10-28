import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {withoutDataActions} from '_redux/actions';
import {SPLASH_ACTION} from '_redux/actionTypes';

const Splash = (props) => {
  console.log('Hello From Habber');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutDataActions(SPLASH_ACTION));
  }, []);
  return (
    <Image
      style={styles.Image}
      resizeMode="stretch"
      source={require('../../assets/images/splash.png')}
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
