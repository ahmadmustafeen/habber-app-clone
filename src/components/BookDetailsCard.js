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
import { ModalImage } from './ModalImage';
const BookDetailsCard = (props) => {
  console.log("book details card", props)
  const { t } = useTranslation(['BookDetails'])
  const { colors } = useTheme();
  const {
    isbn,
    maker_name,
    author_name,
    arabic_author_name,
    image,
    price,
    title, arabic_title,
    quantity,
    genre,
    onClickFavourite,
    product_type,
    prices,
    favourite,
    onClickShare, arabic_maker_name,
    onGoodReads,
    subheading
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

  const modalRef = useRef(null);
  const toggleModal = () => {
    modalRef.current.toggle();
  };
  return (
    <View style={styles.container}>
      <View style={product_type === 'bookmark' ? { aspectRatio: 0.6 / 1, height: hp(35) } : styles.imgContainer}>
        <FastImage
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
          onPress={toggleModal}
        />
      </View>

      <View
        style={styles.bookDetailsContainer}>
        <View style={{
          transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          // subheading: { fontSize: 20 },
          marginTop: wp(7),
        }}>
          <AppText bold size={17}>
            {I18nManager.isRTL ? arabic_title : title}
          </AppText>
          <AppText
            size={15}
            style={{ paddingBottom: wp(6), fontStyle: 'italic' }}>
            {t('by')} {product_type === "book" ? I18nManager.isRTL ? arabic_author_name : author_name : I18nManager.isRTL ? arabic_maker_name : maker_name}
          </AppText>
          <AppText bold size={17}>
            {t('price')} {rtlLayout && price_product.symbol}
            {(parseFloat(prices.find((price) => price.iso === UserProfileReducer.currency.iso).price.toString().replace(",", ""))).toFixed(2)}
            {rtlLayout || price_product.symbol}
          </AppText>
          <AppText bold size={15} color="red">
            {!quantity && t('outOfStock')}
          </AppText>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }}>
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
      <ModalImage ref={modalRef} source={{ uri: image }} />
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
    height: hp(31),

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
