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
const BookDetailsCard = (props) => {
  const { colors } = useTheme();
  const {
    author_name,
    image,
    price,
    title,
    quantity,
    genre,
    onClickFavourite,
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
            by {author_name}
          </AppText>
          <AppText bold size={17}>
            Price: {price} KD
          </AppText>
          <AppText bold size={15} color="red">
            {!quantity && 'Out of Stock'}
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
          <RoundIcon name="glide-g" type="font-awesome" color="#fff" small />
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
