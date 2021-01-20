import React from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, I18nManager, Text, } from 'react-native';
import { Header } from '_components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { AppText } from 'components/common';
import { shallowEqual, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import { HOME } from '../../constants/Screens';
// import { parse } from '@babel/core';

const Invoice = (props) => {
    console.log(props, "ORDER DATA")
    const {
        UserProfileReducer,
    } = useSelector((state) => {
        return {
            UserProfileReducer: state.UserProfileReducer,
        };
    }, shallowEqual);
    const item = props.route.params.item
    console.log("item", item)
    console.log(item, UserProfileReducer)
    const { colors } = useTheme()
    const InvoiceItem = (props) => {
        return (
            <View style={{ width: wp(90), paddingVertical: hp(1), alignSelf: 'center', flex: 2, flexDirection: 'row', justifyContent: 'space-between', }}>

                <View style={{ width: wp(0.8), height: hp(5), position: "absolute", left: 0, top: hp(2), backgroundColor: colors.primary }} />
                <View style={{ paddingLeft: wp(2), flex: 1, }}>
                    <AppText style={styles.txt} size={20} bold >{props.headerLeft}</AppText>
                    <AppText capitalize small >{props.textLeft}</AppText>
                </View>

                <View style={{ width: wp(0.8), height: hp(5), position: "absolute", right: 0, top: hp(2), backgroundColor: colors.primary }} />


                <View style={{ paddingRight: wp(2), flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start', }}>
                    <AppText style={styles.txt} size={20} bold>{props.headerRight}</AppText>
                    <AppText capitalize small >{props.textRight}</AppText>
                </View >
            </View >
        )
    }
    const OrderBox = (props) => {
        return (
            <View style={styles.detailCartHeader}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                    <AppText text small>
                        {props.name}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <AppText text small>
                        {props.price}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <AppText text small>
                        {props.quantity}
                    </AppText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <AppText text small>
                        {props.subtotal}
                    </AppText>
                </View>

            </View>
        )
    }

    var rtlLayout = false;
    (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)

    return (
        <ScrollView>

            <Header  {...props} title={props.route.params.orderDetails && "Orders Detail"}
                headerLeft={<Icon
                    onPress={() => props.navigation.navigate(HOME)}
                    color={colors.primary}
                    name={I18nManager.isRTL ? "rightcircleo" : "leftcircleo"}
                    type="antdesign"
                />} headerImage />

            <View key="content">
                <InvoiceItem headerLeft="Order ID" headerRight="Order Date" textLeft={item.id} textRight={item.created_at.split('T')[0]} />
                <View style={{ width: wp(80), alignSelf: "center", borderBottomColor: colors.primary, borderBottomWidth: hp(0.1) }} />
                <InvoiceItem headerLeft="Customer Name" headerRight="Phone No." textLeft={UserProfileReducer.first_name} textRight={UserProfileReducer.phone} />
                <View style={{ width: wp(80), paddingVertical: hp(1), alignSelf: "center", borderBottomColor: colors.primary, borderBottomWidth: hp(0.1) }} />
                <InvoiceItem headerLeft="Address" headerRight="Payment Method" textLeft={item.Address} textRight={item.payment_type} />

                <View style={[styles.detailCart]}>
                    <View style={[styles.detailCartHeader, { backgroundColor: colors.borderColor }]}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
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
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                Subtotal
                            </AppText>
                        </View>

                    </View>
                    {item.books.map(book => { return <OrderBox key={book.id} name={book.title} price={(parseFloat(parseFloat(book.price.toString().replace(',', '')))).toFixed(2)} quantity={book.cart_quantity} subtotal={book.cart_price} /> })}
                    {item.bookmarks.map(book => { return <OrderBox key={book.id} name={book.title} price={(parseFloat(parseFloat(book.price.toString().replace(',', '')))).toFixed(2)} quantity={book.cart_quantity} subtotal={book.cart_price} /> })}

                    <View style={[styles.detailCartHeader, { backgroundColor: colors.secondary, justifyContent: 'space-between', paddingHorizontal: wp(5) }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                Total
                            </AppText>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                {rtlLayout || item.currency_iso} {item.total_price.toFixed(2)} {rtlLayout && item.currency_iso}
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
        width: wp(90),
        flexDirection: 'row',
        height: hp(8),
    }
});
export default Invoice;
