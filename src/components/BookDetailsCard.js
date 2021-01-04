import React, { useRef } from 'react';
import { View, StyleSheet, I18nManager, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { RoundIcon } from './RoundIcon';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useSelector, shallowEqual } from 'react-redux';
const BookDetailsCard = (props) => {
  console.log("book details card", props)
  const { t } = useTranslation(['BookDetails'])
  const { colors } = useTheme();
  const {
    isbn,
    maker_name,
    author_name,
    image,
    price,
    title,
    quantity,
    genre,
    onClickFavourite,
    product_type,
    prices,
    favourite,
    onClickShare,
    onGoodReads
  } = props;


  const {
    UserProfileReducer,
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
    };
  }, shallowEqual);
  const price_product = prices.find((item) => item.iso === UserProfileReducer.currency.iso);
  var rtlLayout = false;
  (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)

  return (
    <View style={styles.container}>
      <View style={product_type === 'bookmark' ? { aspectRatio: 0.6 / 1, height: hp(35) } : styles.imgContainer}>
        <FastImage
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
        />
      </View>

      <View
        style={styles.bookDetailsContainer}>
        <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], marginTop: wp(3) }}>
          <AppText bold size={17}>
            {title}
          </AppText>
          <AppText
            size={15}
            style={{ paddingBottom: wp(10), fontStyle: 'italic' }}>
            {t('by')}{product_type === "book" ? author_name : maker_name}
          </AppText>
          <AppText bold size={17}>
            {t('price')} {rtlLayout && price_product.symbol} {parseFloat(price).toFixed(2)} {rtlLayout || price_product.symbol}
          </AppText>
          <AppText bold size={15} color="red">
            {!quantity && t('outOfStock')}
          </AppText>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <RoundIcon
            name="heart"
            type="font-awesome"
            color={favourite ? '#000' : '#fff'}
            small
            fav
            onPress={onClickFavourite}
          />
          <RoundIcon
            name="share-alt"
            type="font-awesome"
            color="#fff"
            small
            onPress={onClickShare}
          />

          <RoundIcon
            name={product_type === "book" ? "glide-g" : null}
            type="font-awesome"
            color="#fff"
            small
            onPress={onGoodReads}
            background={product_type === "book" ? null : "rgba(0,0,0,0)"}
          />


        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  imgContainer: {
    aspectRatio: 0.6 / 1,
    height: hp(30),

  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginStart: 10,
    marginTop: 10,
  },
  bookDetailsContainer: {
    flex: 1,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingStart: !I18nManager.isRTL ? 10 : 0,
  },
  iconContainer: {
    width: wp(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  }
});
export { BookDetailsCard };
