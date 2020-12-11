import React, { useRef } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { RoundIcon } from './RoundIcon';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
const BookDetailsCard = (props) => {
  const { t } = useTranslation(['BookDetails'])
  const { colors } = useTheme();
  const {
    author_name,
    image,
    price,
    title,
    quantity,
    genre,
    onClickFavourite,
    product_type,
    favourite, onClickShare
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <FastImage
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flex: 1,
          transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingStart: !I18nManager.isRTL ? 10 : 0,
        }}>
        <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], marginTop: wp(3) }}>
          <AppText bold size={17}>
            {title}
          </AppText>
          <AppText
            size={15}
            style={{ paddingBottom: wp(10), fontStyle: 'italic' }}>
            {t('by')}{author_name}
          </AppText>
          <AppText bold size={17}>
            {t('price')}  {parseFloat(price).toFixed(2)} KD
          </AppText>
          <AppText bold size={15} color="red">
            {!quantity && t('outOfStock')}
          </AppText>
        </View>
        <View
          style={{
            width: wp(60),
            flexDirection: 'row',
            justifyContent: 'space-between',
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}>
          <RoundIcon
            name="heart"
            type="font-awesome"
            color={favourite ? '#000' : '#fff'}
            small
            fav
            onPress={onClickFavourite}
          />
          <RoundIcon name="share-alt" type="font-awesome" color="#fff" small onPress={onClickShare} />

          <RoundIcon name={product_type === "book" ? "glide-g" : null} type="font-awesome" color="#fff" small background={product_type === "book" ? null : "rgba(0,0,0,0)"} />


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
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginStart: 10,
    marginTop: 10,
  },
});
export { BookDetailsCard };
