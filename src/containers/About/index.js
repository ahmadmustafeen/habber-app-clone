import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, I18nManager } from 'react-native';
import { AppText, Screen } from '../../components/common';
import { Color } from '_constants/Colors';
import { Header } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { BackHandler } from 'react-native';
import { Platform } from 'react-native';
const About = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const { StaticReducer } = useSelector((state) => {
    return { StaticReducer: state.StaticReducer }
  })
  const link = (I18nManager.isRTL ? StaticReducer.about_us_url_ar : StaticReducer.about_us_url)
  const { colors } = useTheme()
  const SCRIPT = `
const meta = document.createElement('meta');
meta.setAttribute('content', ' initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
meta.setAttribute('name', 'viewport');
document.head.appendChild(meta);
`;
  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props}
          headerImage
          headerLeft
          backIcon={
            <Icon
              onPress={() => props.navigation.goBack()}
              color={colors.primary}
              name="leftcircleo"
              type="ant-design"
            />
          } />
      </View>

      <View key="content" style={{ width: wp(90), alignSelf: "center" }}>
        <WebView
          source={{ uri: link }}
          style={styles.staticPage}
          scalesPageToFit={Platform.OS === 'android' ? false : true}
          injectedJavaScript={SCRIPT}
        />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  staticPage: {
    height: hp(70),
    width: wp(100)
  }
})
export default About;
