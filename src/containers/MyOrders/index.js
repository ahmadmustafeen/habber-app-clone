import React from 'react';
import { View, StyleSheet, Image, ScrollView, ImageBackground, I18nManager, FlatList } from 'react-native';
import { AppText, Screen } from '../../components/common';
import { Header } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
const MyOrders = (props) => {
  const { colors } = useTheme();
  const { OrderReducer } = useSelector((state) => {
    return {
      OrderReducer: state.OrderReducer
    }
  })
  const OrderItem = (item) => {
    return (
      <View style={styles.profiletop}>
        <View style={styles.orderContainer}>
          <AppText size={16} style={styles.apptextpadding}><AppText bold size={17}>Order ID: </AppText> {item.order_id}</AppText>
          {item.order_title.map((title) =>
            <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
          )}

          <AppText size={16} style={styles.statuspadding}><AppText bold size={17}>Status: </AppText>{item.order_status}</AppText>
        </View>
        <View style={styles.totalContainer}>
          <AppText size={16} style={styles.apptextpadding}><AppText size={17} bold>Total: </AppText>${item.order_total}</AppText>
          <AppText size={16} style={styles.apptextpadding}>{item.order_date}</AppText>
        </View>
      </View>
    )
  }
  return (

    <Screen noPadding>
      <View key="header">
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

          <Header title={"My Orders"} {...props} />


        </ImageBackground>
      </View>

      <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
        <FlatList
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          // horizontal
          data={OrderReducer}
          keyExtractor={(item, index) => index.toString() + item}
          renderItem={(item) => OrderItem(item.item)}
          ListEmptyComponent={() => (
            <View>
              <AppText>No Book Available</AppText>
            </View>
          )}
          ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
        />

      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingStart: 20,
    paddingVertical: 20
  },
  totalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingEnd: 20
  },
  profiletop: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 0,
    backgroundColor: "rgb(250, 250, 250)",
    borderRadius: 10,
  },
  apptextpadding: {
    color: "rgb(150,150,150)",
    textTransform: "capitalize",
    fontWeight: "300",
    paddingVertical: 3
  },
  statuspadding: {
    paddingVertical: 15,
    textTransform: "capitalize",
  }
});

export default MyOrders;
