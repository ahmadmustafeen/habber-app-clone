import React, { useState } from 'react';
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

const SignUpTermCondition = (props) => {



  const { StaticReducer } = useSelector((state) => {
    return { StaticReducer: state.StaticReducer }
  })
  const link = (I18nManager.isRTL ? StaticReducer.terms_and_condition_url_ar : StaticReducer.terms_and_condition_url)
  const { colors } = useTheme()

  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props} headerImage backIcon headerLeft />

      </View>

      <View key="content">
        <WebView source={{ uri: link }} style={styles.staticPage} />
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
export default SignUpTermCondition;
