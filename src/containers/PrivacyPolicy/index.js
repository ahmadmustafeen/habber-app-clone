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
const PrivacyPolicy = (props) => {
    const { colors } = useTheme()

    return (
        <ScrollView>
            <ImageBackground
                style={{
                    height: hp(21),
                    paddingHorizontal: wp(3),
                    paddingBottom: hp(8),
                    marginBottom: hp(1),
                    justifyContent: 'flex-end',
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                }}
                resizeMode='stretch'
                source={require('_assets/images/header.png')}>

                <Header {...props}

                    headerLeft={
                        <Icon
                            onPress={() => props.navigation.goBack()}
                            color={colors.primary}
                            name="leftcircleo"
                            type="ant-design"
                        />
                    } />


            </ImageBackground>
            <Screen backgroundColor={colors.white}>
                <View key="header"></View>
                <View key="content">
                    <View style={styles.container}>
                        <AppText
                            bold
                            size={22}
                            style={{ paddingVertical: hp(1) }}
                        >
                            Lorem ipsum dolor sit emi
            </AppText>
                        <AppText
                            color={colors.text}
                            size={17}
                        >
                            Lorem ipsum sda asdfasd asdsd asdfasd
                            asdasd saddas adsdas csv sdg ert sac   szc zxdxas
                            sad asdas
                            dasd asdasdas dasda
            </AppText>
                        <AppText
                            bold
                            size={17}
                            style={{ paddingVertical: hp(1) }}
                        >
                            Lorem ipsum dolor sit emi
            </AppText>
                        <AppText>
                            Lorem ipsum sda asdfasd asdsd asdfasd
                            asdasd saddas adsdas csv sdg ert sac   szc zxdxas
                            sad asdas
                            dasd asdasdas dasda
            </AppText>
                        <AppText
                            bold
                            size={22}
                            style={{ paddingVertical: hp(1) }}
                        >
                            Lorem ipsum dolor sit emi
            </AppText>
                        <AppText
                            color={colors.text}
                            size={17}
                        >
                            Lorem ipsum sda asdfasd asdsd asdfasd
                            asdasd saddas adsdas csv sdg ert sac   szc zxdxas
                            sad asdas
                            dasd asdasdas dasda
            </AppText>
                        <AppText
                            bold
                            size={18}
                            style={{ paddingVertical: hp(1) }}
                        >
                            Lorem ipsum dolor sit emi
            </AppText>
                        <AppText
                            color={colors.text}
                            size={17}
                        >
                            Lorem ipsum sda asdfasd asdsd asdfasd
                            asdasd saddas adsdas csv sdg ert sac   szc zxdxas
                            sad asdas
                            dasd asdasdas dasda
            </AppText>
                    </View>
                </View>
            </Screen>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: hp(2),
        width: wp(90),
        height: hp(100),
    }
})
export default PrivacyPolicy;
