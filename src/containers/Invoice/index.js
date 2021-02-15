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
            <View style={[styles.detailCartHeader, { paddingVertical: hp(1), paddingHorizontal: wp(3) }]}>
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

    var delivery_charges = 0;
    item.books.map(book => delivery_charges += parseFloat(book.cart_price.toString().replace(",", "")))
    item.bookmarks.map(book => delivery_charges += parseFloat(book.cart_price.toString().replace(",", "")))
    // item.bookmarks.map(book => delivery_charges += (parseFloat(parseFloat(book.price.toString().replace(',', '')))).toFixed(2))
    delivery_charges = (parseFloat(item.total_price.toString().replace(",", ""))).toFixed(2) - delivery_charges
    // console.log(delivery_charges)

    return (
        <ScrollView>

            <Header  {...props} title={props.route.params.orderDetails && (I18nManager.isRTL ? "تفاصيل الطلب" : "Orders Detail")}
                headerLeft={
                    <Icon
                        onPress={() => props.navigation.navigate(HOME)}
                        color={colors.primary}
                        name={I18nManager.isRTL ? "leftcircleo" : "leftcircleo"}
                        type="antdesign"
                    />} headerImage />

            <View key="content">
                <InvoiceItem headerLeft={I18nManager.isRTL ? "رقم التعريف الخاص بالطلب" : "Order ID"} headerRight={I18nManager.isRTL ? "تاريخ الطلب" : "Order Date"} textLeft={item.id} textRight={item.created_at.split('T')[0]} />
                <View style={{ width: wp(80), alignSelf: "center", borderBottomColor: colors.primary, borderBottomWidth: hp(0.1) }} />
                <InvoiceItem headerLeft={I18nManager.isRTL ? "اسم الزبون" : "Customer Name"}
                    headerRight={I18nManager.isRTL ? "رقم الهاتف" : "Phone No."} textLeft={UserProfileReducer.first_name}
                    textRight={item.phone} />
                <View style={{
                    width: wp(80), paddingVertical: hp(1), alignSelf: "center",
                    borderBottomColor: colors.primary, borderBottomWidth: hp(0.1)
                }} />
                <InvoiceItem headerLeft={I18nManager.isRTL ? "عنوان" : "Address"}
                    headerRight={I18nManager.isRTL ? "طريقة الدفع او السداد" : "Payment Method"}
                    textLeft={item.address_name} textRight={item.payment_type} />

                <View style={[styles.detailCart]}>
                    <View style={[styles.detailCartHeader, { backgroundColor: colors.borderColor }]}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                {I18nManager.isRTL ? "اسم" : "Name"}
                            </AppText>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                {I18nManager.isRTL ? "السعر" : "Price"}
                            </AppText>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                {I18nManager.isRTL ? "كمية" : "Qty"}
                            </AppText>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText bold secondary small >
                                {I18nManager.isRTL ? "المجموع الفرعي" : "Subtotal"}
                            </AppText>
                        </View>

                    </View>
                    {item.books.map(book => {
                        // (book.find(bookss => book.id === bookss.id).prices.find((id) => book.currency.id === id.id).price)
                        return <OrderBox key={book.id} name={I18nManager.isRTL ? book.arabic_title : book.title} price={((parseFloat(book.cart_price)) / parseFloat(book.cart_quantity)).toFixed(2)} quantity={book.cart_quantity} subtotal={(((book.cart_price).toFixed(2)))} />
                    })
                    }
                    {item.bookmarks.map(book => { return <OrderBox key={book.id} name={book.title} price={((book.cart_price) / book.cart_quantity).toFixed(2)} quantity={(parseFloat(book.cart_quantity))} subtotal={(((book.cart_price).toFixed(2)))} /> })}

                    <View style={[styles.detailCartHeader, { backgroundColor: colors.secondary, justifyContent: 'space-between', paddingHorizontal: wp(5) }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <AppText white bold secondary small >
                                {I18nManager.isRTL ? "رسوم التوصيل" : "Delivery Charges"}
                            </AppText>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <AppText white bold secondary small >
                                {rtlLayout || item.currency_iso} {(parseFloat(item.shipping_charges.toString().replace(",", ""))).toFixed(2)} {rtlLayout && item.currency_iso}
                            </AppText>
                        </View>


                    </View>
                    <View style={[styles.detailCartHeader, { backgroundColor: colors.secondary, justifyContent: 'space-between', paddingHorizontal: wp(5), borderBottomLeftRadius: 20, borderBottomEndRadius: 20, }]}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                {I18nManager.isRTL ? "مجموع" : "Total"}
                            </AppText>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: hp(5) }}>
                            <AppText white bold secondary small >
                                {rtlLayout || item.currency_iso} {(parseFloat(item.total_price.toString().replace(",", ""))).toFixed(2)} {rtlLayout && item.currency_iso}
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
        paddingBottom: hp(10),
        // height: hp(20),
        overflow: 'hidden'
    },
    detailCartHeader: {
        width: wp(90),
        flexDirection: 'row',
        minHeight: hp(7),
    }
});
export default Invoice;
