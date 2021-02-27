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
const PrivacyPolicy = (props) => {
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

    const { StaticReducer } = useSelector((state) => {
        return { StaticReducer: state.StaticReducer }
    })
    const link = (I18nManager.isRTL ? StaticReducer.privacy_policy_url_ar : StaticReducer.privacy_policy_url)
    const { colors } = useTheme()

    return (
        <Screen noPadding>
            <View key="header">
                <Header {...props} headerImage backIcon headerLeft />

            </View>
            <View key="content" style={{ width: wp(90), alignSelf: "center" }}>
                <WebView source={{ uri: link }} style={styles.staticPage}
                    scalesPageToFit={Platform.OS === 'android' ? false : true}

                />
            </View>
        </Screen>
    );
};
const styles = StyleSheet.create({
    staticPage: {
        height: hp(70),
        width: wp(90)
    }
})
export default PrivacyPolicy;
