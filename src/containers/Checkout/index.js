import React from 'react';
import {View,ScrollView, StyleSheet, Image} from 'react-native';
import {AppText, Button, Screen} from '_components/common';
import {ADD_NEW_ADDRESS, EDIT_PROFILE} from '_constants/Screens';
import {HorizontalRow} from '_components/HorizontalRow';
import {Header} from '_components/Header';

const Checkout = (props) => {
  const {navigate} = props.navigation;
  return (
    <ScrollView>
    <Header {...props} title={'Checkout'} />
    <Screen>
      <View key="header"></View>
      <View key="content">
      <View style={styles.addressbookview}>
            <AppText bold style={{paddingStart:10,paddingVertical:10}}>Select Payment Option</AppText>
          <View style={styles.addressbook}>
              <AppText size={16}>
                Online Payment
              </AppText>
          </View>
          <View style={styles.addressbook}>
              <AppText size={16}>
                Cash On Delivery              
              </AppText>
          </View>
        </View>
        <HorizontalRow />
        <View style={styles.addressbookview}>
            <AppText bold style={{paddingStart:10,paddingVertical:10}}>Deliver To:</AppText>
          <View style={styles.addressbook}>
            <View>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Bae's Home
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Work
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Bae's Home
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
              <AppText size={15} primary style={styles.spacebtwaddresses}>
                Other
              </AppText>
              <AppText size={15} style={styles.spacebtwaddresses}>
                D/11 Cross Street, New York, USA, 39001
              </AppText>
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
    marginLeft: 15,
  },
  addressbook: {
    borderRadius: 5,
    borderColor: 'rgb(221, 221, 221)',
    borderWidth: 2.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressbookview: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  spacebtwaddresses: {
    marginLeft: 15,
    marginTop: 10,
  },
});

export default Checkout;
