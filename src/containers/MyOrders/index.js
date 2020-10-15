import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {AppText, Screen} from '../../components/common';
import {Header} from '../../components';

const MyOrders = (props) => {
  return (
    <ScrollView>
      <Header {...props} title={'My Orders'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.profiletop}>
            <View style={styles.orderContainer}>
              <AppText size={17} style={styles.apptextpadding}><AppText bold size={17}>Order ID: </AppText> 263493511</AppText>
              <AppText size={17} style={styles.apptextpadding}>A Brief History of Time</AppText>
              <AppText size={17} style={styles.apptextpadding}>Lolita</AppText>
              <AppText size={17} style={styles.apptextpadding}>The Secret</AppText>
              <AppText size={17} style={styles.statuspadding}><AppText bold size={17}>Status: </AppText>Delivered</AppText>
            </View>
            <View style={styles.totalContainer}>
              <AppText size={17} style={styles.apptextpadding}><AppText size={17} bold>Total: </AppText>$170</AppText>
              <AppText size={17} style={styles.apptextpadding}>05/04/2019</AppText>
            </View>
          </View>
          <View style={styles.profiletop}>
            <View style={styles.orderContainer}>
              <AppText size={17} style={styles.apptextpadding}><AppText bold size={17}>Order ID: </AppText> 263493511</AppText>
              <AppText size={17} style={styles.apptextpadding}>A Brief History of Time</AppText>
              <AppText size={17} style={styles.apptextpadding}>Lolita</AppText>
              <AppText size={17} style={styles.apptextpadding}>The Secret</AppText>
              <AppText size={17} style={styles.statuspadding}><AppText bold size={17}>Status: </AppText>Delivered</AppText>
            </View>
            <View style={styles.totalContainer}>
              <AppText size={17} style={styles.apptextpadding}><AppText size={17} bold>Total: </AppText>$170</AppText>
              <AppText size={17} style={styles.apptextpadding}>05/04/2019</AppText>
            </View>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flex:2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingStart: 20,
    paddingVertical: 20
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingEnd:20
  },
  profiletop: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 0,
    backgroundColor: 'rgb(221, 221, 221)',
    borderRadius: 10,
  },
  apptextpadding:{
    paddingVertical: 3
  },
  statuspadding:{
    paddingVertical: 15
  }
});

export default MyOrders;
