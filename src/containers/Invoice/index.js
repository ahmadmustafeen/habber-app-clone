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
    const InvoiceItem = (props) => {
        return (
            <View style={{ width: wp(90), paddingVertical: hp(1), alignSelf: 'center', flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>

                <View style={{ width: wp(0.8), height: hp(5), position: "absolute", left: 0, top: hp(2), backgroundColor: colors.primary }} />


                <View style={{ paddingLeft: wp(2), flex: 1, }}>
                    <AppText style={styles.txt} size={20} bold >{props.headerLeft}</AppText>
                    <AppText small >{props.textLeft}</AppText>
                </View>

                <View style={{ width: wp(0.8), height: hp(5), position: "absolute", right: 0, top: hp(2), backgroundColor: colors.primary }} />


                <View style={{ paddingRight: wp(2), flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start', }}>
                    <AppText style={styles.txt} size={20} bold>{props.headerRight}</AppText>
                    <AppText small >{props.textRight}</AppText>
                </View >
            </View >
        )
    }
    const OrderBox = (props) => {
        return (
            <View style={styles.detailCartHeader}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                    <AppText text small>
                        {props.name}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                    <AppText text small>
                        {props.price}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                    <AppText text small>
                        {props.quantity}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                    <AppText text small>
                        {props.subtotal}
                    </AppText>
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
                <Header backIcon {...props} headerLeft title={"Invoice"} />
            </ImageBackground>
            <View key="content">
                <InvoiceItem headerLeft="Order ID" headerRight="Order Date" textLeft="23423423423" textRight="05/09/2020" />
                <View style={{ width: wp(80), alignSelf: "center", borderBottomColor: colors.primary, borderBottomWidth: hp(0.1) }} />
                <InvoiceItem headerLeft="Customer Name" headerRight="Khalid Ammer" textLeft="Phone no " textRight="234234234234" />
                <View style={{ width: wp(80), paddingVertical: hp(1), alignSelf: "center", borderBottomColor: colors.primary, borderBottomWidth: hp(0.1) }} />
                <InvoiceItem headerLeft="Address" headerRight="Payment Method" textLeft="23-E/23 Nasasd Kasdas" textRight="K Net" />

                <View style={[styles.detailCart]}>
                    <View style={[styles.detailCartHeader, { backgroundColor: colors.borderColor }]}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                Name
                            </AppText>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                Price
                            </AppText>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                Qty
                            </AppText>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                Subtotal
                            </AppText>
                        </View>

                    </View>

                    <OrderBox name="book title" price="2132" quantity="23" subtotal="212" />
                    <OrderBox name="book title" price="2132" quantity="23" subtotal="212" />
                    <OrderBox name="book title" price="2132" quantity="23" subtotal="212" />
                    <OrderBox name="book title" price="2132" quantity="23" subtotal="212" />
                    <View style={[styles.detailCartHeader, { backgroundColor: colors.secondary, justifyContent: 'space-between', paddingHorizontal: wp(5) }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                Total
                            </AppText>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                $140
                            </AppText>
                        </View>


                    </View>

                </View>
            </View>



        </ScrollView>
    );
};
const styles = StyleSheet.create({
    txt: {
        paddingVertical: hp(0.6)
    },
    detailCart: {
        marginTop: hp(5),
        flex: 20,
        borderRadius: 20,
        alignSelf: 'center',
        width: wp(90),
        // height: hp(20),
        overflow: 'hidden'
    },
    detailCartHeader: {
        paddingRight: 20,
        width: wp(90),
        flexDirection: 'row',
        height: hp(5),
    }
});
export default Invoice;
