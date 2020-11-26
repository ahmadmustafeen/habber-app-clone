import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, I18nManager, Text } from 'react-native';
import { Header } from '_components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { AppText } from 'components/common';


const Invoice = (props) => {

    const { colors } = useTheme()
    const InvoiceItem = () => {
        return (
            <View style={{ width: wp(90), paddingVertical: hp(1), alignSelf: 'center', flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", borderColor: colors.primary, borderLeftWidth: 3, borderRightWidth: 3 }}>


                <View style={{ paddingLeft: 5, flex: 1, }}>
                    <AppText style={styles.txt} bold size={17}>Ahmad</AppText>
                    <AppText size={13}>ADDRESS thius is the kog text tfield</AppText>
                </View>

                <View style={{ paddingRight: 5, flex: 1, alignItems: 'flex-end', }}>
                    <AppText style={styles.txt} bold size={17}>Ahmad</AppText>
                    <AppText size={13}>ADDRESS</AppText>
                </View>
            </View>
        )
    }
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

                <Header {...props} headerLeft title={"Invoice"} />





            </ImageBackground>
            <View key="content">
                <InvoiceItem />
                <View style={{ width: wp(80), paddingVertical: hp(1), alignSelf: "center", borderBottomColor: "red", borderBottomWidth: 2 }} />
                <InvoiceItem />
                <View style={{ width: wp(80), paddingVertical: hp(1), alignSelf: "center", borderBottomColor: "red", borderBottomWidth: 2 }} />
                <InvoiceItem />

            </View>



        </ScrollView>
    );
};
const styles = StyleSheet.create({
    txt: {
        paddingVertical: hp(1)
    }
});
export default Invoice;
