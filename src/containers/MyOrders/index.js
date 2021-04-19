import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, ImageBackground, I18nManager, FlatList, Text } from 'react-native';
import { AppText, Screen } from '../../components/common';
import { Header, } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import NoBookAvailbe from '../../components/NoBookAvailable';
import { HOME, INVOICE } from '../../constants/Screens';
import useModal from '_utils/customHooks/useModal';
import { withoutDataActions } from '../../redux/actions';
import { FETCH_ORDER } from '../../redux/actionTypes';

import Loader from '_components/Loader';
import { checkIfLoading } from '../../redux/selectors';
import { BackHandler } from 'react-native';
const MyOrders = (props) => {

  const dispatch = useDispatch()
  const { visible, toggleModal } = useModal();
  const { navigate } = props.navigation;
  const { colors } = useTheme();
  useEffect(() => {
    dispatch(withoutDataActions(FETCH_ORDER));
  }, [])
  const { OrderReducer, isLoading } = useSelector((state) => {
    return {
      OrderReducer: state.OrderReducer,
      isLoading: checkIfLoading(state, FETCH_ORDER)
    }
  })
  const { t } = useTranslation(['Order'])



  const handleBackButton = () => {
    props.navigation.navigate(HOME)
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])


  const renderItem = ({ item }) => {

    return (
      <View style={styles.profiletop}>
        <View style={styles.orderContainer}>
          <AppText size={16} style={styles.apptextpadding}>
            <AppText bold size={17}>{I18nManager.isRTL ? "رقم التعريف الخاص بالطلب" : "Order ID"}: </AppText> {item.id}</AppText>
          {item.books.map((title) =>
            <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
          )}
          {item.bookmarks.map((title) =>
            <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
          )}

          {/* <AppText size={14} style={styles.apptextpadding}>{item.address_name}</AppText> */}

          <AppText size={16} style={styles.statuspadding}><AppText bold size={17}>{I18nManager.isRTL ? "الحالة" : "Status"}: </AppText>{t(item.status)}</AppText>
        </View>
        <View style={styles.totalContainer}>
          <AppText size={16} style={styles.apptextpadding}><AppText size={17} bold>{I18nManager.isRTL ? "مجموع" : "Total"}:
           </AppText> {item.currency_iso} {((parseFloat(item.total_price.toString().replace(",", ""))) + (parseFloat(item.shipping_charges.toString().replace(",", "")))).toFixed(2)}</AppText>
          <AppText size={16} style={styles.apptextpadding}>{item.created_at.split('T')[0]}</AppText>

          <Loader loading={isLoading} />
        </View>
        <View style={styles.Icon}>
          <Icon
            onPress={() => navigate(INVOICE, {
              item, orderDetails: true
            })}
            color="#c27e12"
            name={I18nManager.isRTL ? "leftcircleo" : "rightcircleo"}
            type="ant-design"
          />
        </View>
      </View>
    );
  };
  // const OrderItem = (item, index) => {
  //   return (
  //     <View key={index} style={styles.profiletop}>
  //       <View style={styles.orderContainer}>
  //         <AppText size={16} style={styles.apptextpadding}><AppText bold size={17}>Order ID: </AppText> {item.id}</AppText>
  //         {item.books.map((title) =>
  //           <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
  //         )}
  //         {item.bookmarks.map((title) =>
  //           <AppText size={14} style={styles.apptextpadding}>{title.title}</AppText>
  //         )}

  //         <AppText size={16} style={styles.statuspadding}><AppText bold size={17}>Status: </AppText>{item.status}</AppText>
  //       </View>
  //       <View style={styles.totalContainer}>
  //         <AppText size={16} style={styles.apptextpadding}><AppText size={17} bold>Total: </AppText>{item.currency_iso} {item.total_price}</AppText>
  //         <AppText size={16} style={styles.apptextpadding}>{item.date}</AppText>
  //       </View>
  //       <View style={styles.Icon}>
  //         <Icon
  //           onPress={() => navigate(INVOICE, {
  //             item, orderDetails: true
  //           })}
  //           color="#c27e12"
  //           name="rightcircleo"
  //           type="ant-design"
  //         />
  //       </View>
  //     </View>
  //   )
  // }
  return (

    // <ScrollView noPadding>


    // <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
    <Screen noPadding>
      {/* ListHeaderComponent={() => (
        <> */}
      <View key="header">

        <Header {...props}
          // headerLeft
          headerImage
        // backIcon
        />


      </View>
      {/* {OrderReducer.map((item, index) => {
        return (

          <Text key={index}>{item.total_price}</Text>
        )
      })} */}
      <View key="content">
        <FlatList
          data={OrderReducer}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{ paddingBottom: hp(5) }}></View>}
          ListEmptyComponent={<AppText style={{ paddingHorizontal: wp(10) }}>{I18nManager.isRTL ? 'لا يوجد شيء لعرضه هنا!' : 'Nothing to Show here!'}</AppText>}
        />
        {/* <FlatList

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
      /> */}

      </View>
    </Screen>
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
    bottom: hp(3),
    right: wp(10),
  }
});

export default MyOrders;
