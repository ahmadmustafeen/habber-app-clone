import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppText, Button } from './common';
import { HorizontalRow } from './HorizontalRow';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { checkIfLoading } from '../redux/selectors';
import { I18nManager } from 'react-native';

const FavouriteCard = (props) => {

  const { UserProfileReducer } = useSelector((state) => ({
    UserProfileReducer: state.UserProfileReducer,
  }));
  var rtlLayout = false;
  (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)
  console.log(props, "FAVORUTIRE PROPS")

  const { colors } = useTheme();
  return (
    <>
      <View style={styles.profiletop}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: props.item.image }} />
        </View>

        <View style={styles.viewtxt}>
          <AppText bold style={styles.txt}>
            {I18nManager.isRTL ? props.item.arabic_title : props.item.title}
          </AppText>
          <AppText bold small style={[styles.txt, styles.author]}>
            {I18nManager.isRTL ? "بواسطة" : "by"} {props.item.author_name}
          </AppText>
          <AppText bold style={styles.pricetxt}>
            {I18nManager.isRTL ? "السعر:" : "Price:"} {rtlLayout && UserProfileReducer.currency.symbol} {(parseFloat(props.item.prices.find((price) => price.iso === UserProfileReducer.currency.iso).price.toString().replace(",", ""))).toFixed(2)} {rtlLayout || UserProfileReducer.currency.symbol}
          </AppText>
          <Button
            bold
            fontSize={15}
            primary
            color="black"
            style={styles.pricetxt}
            onPress={props.item.quantity ? props.onAddToCart : () => console.log("NO QUANTITY")}
            round>
            {props.item.quantity ? (I18nManager.isRTL ? "أضف إلى السلة" : "Add To Cart") : (I18nManager.isRTL ? "إنتهى من المخزن" : "Out Of Stock")}
          </Button>
          <HorizontalRow
            style={{
              borderColor: 'rgb(200,200,200)',
              borderWidth: 1,
              marginVertical: hp(2),
            }}
          />
          <TouchableOpacity
            onPress={props.onRemove}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              containerStyle={{ paddingRight: wp(5) }}
              size={30}
              color={colors.primary}
              name="trash-o"
              type="font-awesome"
            />
            <AppText bold primary style={[styles.txt, { marginLeft: wp(-3) }]}>
              {I18nManager.isRTL ? "إزالة" : "Remove"}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
      <HorizontalRow
        style={{
          borderColor: 'rgb(200,200,200)',
          borderWidth: 1,
          marginVertical: hp(2),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: hp(35),
    aspectRatio: 0.6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewtxt: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: wp(43),
  },
  pricetxt: {
    marginTop: 20,
    width: wp(45),
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  author: {
    fontStyle: 'italic',
  },
});

export { FavouriteCard };
