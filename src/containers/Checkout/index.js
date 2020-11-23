import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground, I18nManager, FlatList } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { ADD_NEW_ADDRESS, EDIT_PROFILE } from '_constants/Screens';
import { HorizontalRow } from '_components/HorizontalRow';
import { Header } from '_components/Header';
import { RadioButton, AddressCard } from '_components'
import { useSelector, shallowEqual } from 'react-redux'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Checkout = (props) => {


  const {
    AddressReducer
  } = useSelector((state) => {
    return {
      AddressReducer: state.AddressReducer,
    };
  }, shallowEqual);

  const [state, setState] = useState({
    paymentMethod: "",
    address: ""
  })
  const setStateHandler = (key, val) => {
    // console.log(key, val)
    setState({ ...state, [key]: val });
  };
  const { navigate } = props.navigation;
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

        <Header {...props} title={'Checkout'} />


      </ImageBackground>
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.addressbookview}>
            <AppText bold style={{ paddingStart: 10, paddingVertical: 10 }}>
              Select Payment Option
            </AppText>
            <View style={styles.addressbook}>
              <View style={styles.addressbookimg}>
                <Image
                  style={styles.img}
                  source={require('_assets/images/onlinepayment.png')}></Image>
              </View>
              <AppText size={16}>Online Payment</AppText>
              <RadioButton title="online" hideTitle business={state.paymentMethod} onPress={() => setStateHandler("paymentMethod", "online")} style={styles.radioButton} />
            </View>
            <View style={styles.addressbook}>
              <View style={styles.addressbookimg}>
                <Image
                  style={styles.img}
                  source={require('_assets/images/cash.png')}></Image>
              </View>

              <AppText size={16}>Cash On Delivery</AppText>
              <RadioButton title="cod" hideTitle business={state.paymentMethod} onPress={() => setStateHandler("paymentMethod", "cod")} style={styles.radioButton} />
            </View>
          </View>
          <HorizontalRow />
          <View style={styles.addressbookview}>
            <AppText bold style={{ paddingStart: 10, paddingVertical: 10 }}>
              Deliver To:
            </AppText>
            <View style={styles.addressbook}>
              <View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  vertical
                  data={AddressReducer}
                  keyExtractor={(item, index) => index.toString() + item}
                  renderItem={(item) => {
                    return <AddressCard item={item.item}
                      showSelect
                      showRadio
                      currentValue={state.address}
                      // elementValue={state.address}
                      onPress={() => setStateHandler("address", item.item.id)}
                    />
                  }}
                  ListEmptyComponent={() => (
                    <View>
                      <AppText>No Address Available</AppText>
                    </View>
                  )}
                  ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
                />
              </View>
            </View>
            <Button
              fontSize={17}
              primary
              bold
              onPress={() => navigate(ADD_NEW_ADDRESS)}>
              ADD NEW ADDRESS
            </Button>
            <Button
              fontSize={17}
              secondary
              color={'white'}
              bold
              onPress={() => navigate(ADD_NEW_ADDRESS)}>
              PAY NOW
            </Button>
          </View>
        </View>
      </Screen>
    </ScrollView>
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
  radioButton: {
    position: 'absolute',
    right: 30,
    top: 30
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
    alignItems: 'center',
    borderWidth: 2.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    width: wp(90),
    // paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 30,
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
  addressbookimg: {
    width: wp(10),
    aspectRatio: 1,
    marginRight: wp(10),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Checkout;
