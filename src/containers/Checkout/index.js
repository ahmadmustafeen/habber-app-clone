import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  I18nManager,
  FlatList,
} from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { ADD_NEW_ADDRESS, EDIT_PROFILE, INVOICE } from '_constants/Screens';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import { RadioButton, AddressCard } from '_components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';
import { withDataActions } from '../../redux/actions';
import { CREATE_ORDER } from '../../redux/actionTypes';
import { checkIfLoading } from '../../redux/selectors';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const Checkout = (props) => {

  const { t } = useTranslation(['Cart'])
  const { colors } = useTheme();
  const { AddressReducer, CartReducer, isLoading, UserProfileReducer, FetchCurrencyReducer } = useSelector((state) => {
    return {
      CartReducer: state.CartReducer,
      AddressReducer: state.AddressReducer,
      UserProfileReducer: state.UserProfileReducer,
      FetchCurrencyReducer: state.FetchCurrencyReducer,
      isLoading: checkIfLoading(state, CREATE_ORDER),
    };
  }, shallowEqual);
  console.log(UserProfileReducer, "UserProfileReducer")
  const [state, setState] = useState({
    paymentMethod: '',
    address: '',
  });
  console.log("Checkout props", state.address)
  const setStateHandler = (key, val) => {
    // console.log(key, val)
    setState({ ...state, [key]: val });
  };
  const { navigate } = props.navigation;
  const dispatch = useDispatch();
  var rtlLayout = false;
  (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)
  const price_product = FetchCurrencyReducer.find((item) => item.iso === UserProfileReducer.currency.iso)


  var Address_VAL = AddressReducer.find((addresss) => addresss.id === state.address)
  if (!Address_VAL) Address_VAL = { id: 123213123123123123123, shipping_charges: "0" }
  console.log(Address_VAL)
  return (


    <Screen noPadding>

      <View key="header">

        <Header
          headerLeft backIcon {...props} headerImage noSearch noCart />
      </View>
      <View key="content">
        <View style={styles.addressbookview}>
          <AppText bold style={{ paddingStart: wp(10), paddingVertical: 10 }}>
            {I18nManager.isRTL ? "حدد خيار الدفع" : "Select Payment Option"}
          </AppText>
          <View style={styles.addressbook}>
            <View style={styles.addressbookimg}>
              <Image
                style={styles.img}
                source={require('_assets/images/onlinepayment.png')}></Image>
            </View>
            <AppText size={16}> {I18nManager.isRTL ? "الدفع الالكتروني" : "Online Payment"}</AppText>
            <RadioButton
              hideTitle
              selected={state.paymentMethod === 'online'}
              onPress={() => setStateHandler('paymentMethod', 'online')}
              style={styles.radioButton}
            />
          </View>
          <View style={styles.addressbook}>
            <View style={styles.addressbookimg}>
              <Image
                style={styles.img}
                source={require('_assets/images/cash.png')}></Image>
            </View>

            <AppText size={16}>{I18nManager.isRTL ? "الدفع عند الاستلام" : "Cash On Delivery"}</AppText>
            <RadioButton
              hideTitle
              selected={state.paymentMethod === 'cod'}
              onPress={() => setStateHandler('paymentMethod', 'cod')}
              style={styles.radioButton}
            />
          </View>
        </View>
        {/* <HorizontalRow
          style={{
            borderBottomColor: colors.borderColor,
            borderBottomWidth: hp(0.2),
            marginVertical: hp(3),
          }}
        /> */}
        <HorizontalRow
          style={{
            borderColor: 'rgb(200, 200, 200)',
            borderWidth: hp(0.1),
            width: wp(90),
            alignSelf: 'center',
            marginVertical: hp(2),

          }}
        />
        <View style={styles.addressbookview}>
          <AppText bold style={{ paddingStart: wp(10), paddingVertical: 10 }}>
            {I18nManager.isRTL ? "يسلم إلى" : "Deliver To"}:
            </AppText>
          <View style={styles.addressbook}>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                vertical
                data={AddressReducer}
                keyExtractor={(item, index) => index.toString() + item}
                renderItem={(item) => {
                  return (
                    <AddressCard
                      item={item.item}
                      showSelect
                      showRadio
                      currentValue={state.address}
                      // elementValue={state.address}
                      onPress={() => setStateHandler('address', item.item.id)}
                    />
                  );
                }}
                ListEmptyComponent={() => (
                  <View>
                    <AppText>{I18nManager.isRTL ? "لا يوجد عنوان متاح" : " No Address Available"}</AppText>
                  </View>
                )}
                ListFooterComponent={() => (
                  <View style={{ paddingBottom: 50 }} />
                )}
              />
            </View>
          </View>
          <HorizontalRow
            style={{
              borderColor: 'rgb(200, 200, 200)',
              borderWidth: hp(0.1),
              width: wp(90),
              alignSelf: 'center',
              marginVertical: hp(2),

            }}
          />

          <View style={[styles.totalcontainer, { height: hp(20) }]}>

            <View style={styles.row}>
              <AppText bold>{I18nManager.isRTL ? "المجموع الفرعي" : "Sub Total"} </AppText>
              <View style={styles.pricerow}><AppText bold>{(parseFloat(CartReducer.total_price.toString().replace(",", ""))).toFixed(2)}</AppText></View>
            </View>

            <View style={styles.row}>
              <AppText bold>{I18nManager.isRTL ? "رسوم التوصيل" : "Delivery Charges"} </AppText>
              <View style={styles.pricerow}><AppText bold>{(parseFloat(Address_VAL.shipping_charges.toString().replace(",", ""))).toFixed(2)}</AppText></View>
            </View>

            <HorizontalRow
              style={{
                borderColor: 'rgb(200, 200, 200)',
                borderWidth: hp(0.1),
                width: wp(90),
                alignSelf: 'center',
                marginVertical: hp(1),

              }}
            />
            <View style={styles.row}>
              <AppText bold>{I18nManager.isRTL ? "مجموع" : "Total"} </AppText>
              <View style={styles.pricerow}><AppText bold>{parseFloat((parseFloat(CartReducer.total_price.toString().replace(",", ""))) + (parseFloat(Address_VAL.shipping_charges.toString().replace(",", "")))).toFixed(2)}</AppText></View>
            </View>



            {/* <View
              style={{
                width: wp(60),
                backgroundColor: 'red',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <AppText style={{ paddingVertical: hp(0.5) }} small bold>
                {t('subTotal')}
              </AppText>
              <AppText style={{ paddingVertical: hp(0.7) }} small bold>
                {t('shippingCharges')}
              </AppText> */}


            {/* <HorizontalRow
              style={{
                borderColor: 'rgb(200, 200, 200)',
                borderWidth: hp(0.1),
                width: wp(87),


              }}
            /> */}
            {/* <AppText small primary bold>
              {t('total')}
            </AppText>
          </View> */}
            {/* <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>

              <AppText style={{ paddingVertical: hp(0.5) }} small bold> {rtlLayout && price_product.symbol} {parseFloat(CartReducer.total_price).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText>
              <AppText style={{ paddingVertical: hp(0.5) }} small bold> {rtlLayout && price_product.symbol} {parseFloat(delivery_charges).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText>
              <AppText small primary bold> {rtlLayout && price_product.symbol} {parseFloat(CartReducer.total_price + delivery_charges).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText> */}
            {/* </View> */}
          </View>
          <View style={{ height: hp(20), justifyContent: 'space-around' }}>
            <Button
              add
              fontSize={17}
              primary
              bold
              aadres
              onPress={() => navigate('AddNewAddress', { screen: ADD_NEW_ADDRESS, checkout: true })}>
              {I18nManager.isRTL ? "أضف عنوانًا جديدًا" : "ADD NEW ADDRESS"}
            </Button>
            <Button
              fontSize={17}
              secondary
              color={'white'}
              bold
              loading={isLoading}
              onPress={() => { ((!!state.address) && (!!state.paymentMethod)) ? (dispatch(withDataActions({ address: state.address, paymentMethod: state.paymentMethod }, CREATE_ORDER))) : ((state.paymentMethod) ? Alert.alert(I18nManager.isRTL ? "حدد أو أدخل عنوانًا للمتابعة" : "Select or Enter an Address to Continue") : Alert.alert(I18nManager.isRTL ? "اختار طريقة الدفع" : "Select Payment Method")) }}>
              {I18nManager.isRTL ? "ادفع الآن" : "PAY NOW"}
            </Button>

          </View>
        </View>
      </View>
    </Screen >
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 2,
    overflow: 'hidden',
  },
  totalcontainer: {
    flexDirection: 'column',
  },
  row: {
    height: hp(4),
    flexDirection: 'row',
    width: wp(90),
    justifyContent: 'space-between'
  },
  pricerow: {
    // width: wp(25)
  },
  radioButton: {
    position: 'absolute',
    right: 30,
    top: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  editbtn: {
    backgroundColor: '#c27e12',
    width: 100,
    height: 30,
    position: 'absolute',
    right: 10,
    top: -10,
    color: 'black',
    borderRadius: 400 / 2,
  },
  txt: {
    marginLeft: 10,
    marginTop: 20,
  },
  addressbookheading: {
    marginBottom: 15,
    // marginLeft: 15,
    backgroundColor: 'red',
  },
  addressbook: {
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: 'rgb(221, 221, 221)',
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderWidth: 2.5,
    paddingVertical: hp(1),
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    width: wp(90),
    // paddingHorizontal: 30,
    alignSelf: 'center',
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
  addressbookimg: {
    width: wp(7),
    aspectRatio: 1,
    marginRight: wp(10),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Checkout;
