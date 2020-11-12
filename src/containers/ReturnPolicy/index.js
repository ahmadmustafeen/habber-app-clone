import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { AppText, Screen } from '../../components/common';
import { Color } from '_constants/Colors';
import { Header } from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
const ReturnPolicy = (props) => {
    const { colors } = useTheme()

    return (
        <ScrollView>
            <Header {...props} title={'Return Policy'} />
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
export default ReturnPolicy;
