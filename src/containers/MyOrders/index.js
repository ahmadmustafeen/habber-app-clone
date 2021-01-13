import React from 'react';
import { View, StyleSheet, Image, ScrollView, ImageBackground, I18nManager, FlatList } from 'react-native';
import { AppText, Screen } from '../../components/common';
import { Header, } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import NoBookAvailbe from '../../components/NoBookAvailable';
import { INVOICE } from '../../constants/Screens';
const MyOrders = (props) => {
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  const { OrderReducer } = useSelector((state) => {
    return {
      OrderReducer: state.OrderReducer
    }
  })
  const { t } = useTranslation(['Order'])
  const OrderItem = (item, index) => {
    return (
      <View key={index} style={styles.profiletop}>
        <View style={styles.orderContainer}>
          <AppText size={16} style={styles.apptextpadding}><AppText bold size={17}>Order ID: </AppText> {item.id}</AppText>
          {item.books.map((title) =>
            <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
          )}
          {item.bookmarks.map((title) =>
            <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
          )}

          <AppText size={16} style={styles.statuspadding}><AppText bold size={17}>Status: </AppText>{item.status}</AppText>
        </View>
        <View style={styles.totalContainer}>
          <AppText size={16} style={styles.apptextpadding}><AppText size={17} bold>Total: </AppText>{item.currency_iso} {item.total_price}</AppText>
          <AppText size={16} style={styles.apptextpadding}>{item.date}</AppText>
        </View>
        <View style={styles.Icon}>
          <Icon
            onPress={() => navigate(INVOICE, {
              item, orderDetails: true
            })}
            color="#c27e12"
            name="rightcircleo"
            type="ant-design"
          />
        </View>
      </View>
    )
  }
  return (

    // <ScrollView noPadding>


    // <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
    <FlatList
      ListHeaderComponent={() => (
        <>
          <View key="header">

            <Header {...props}
              headerLeft
              headerImage
              backIcon
            />


          </View>
        </>)}
      style={styles.flatlist}
      showsHorizontalScrollIndicator={false}
      // horizontal
      data={OrderReducer}
      keyExtractor={(item, index) => index.toString() + item}
      renderItem={({ item }) => OrderItem(item)}
      ListEmptyComponent={() => (
        <View>
          <NoBookAvailbe emptyy="No orders available" />
        </View>
      )}
      ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
    />

    /* </View>
  // </ScrollView> */
    // );
  )
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
  },
  Icon: {
    position: 'absolute',
    bottom: hp(6),
    right: wp(10),
  }
});

export default MyOrders;
