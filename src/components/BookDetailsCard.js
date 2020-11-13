import React, { useRef } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { RoundIcon } from './RoundIcon';

const BookDetailsCard = (props) => {
  const { colors } = useTheme();
  const { author_name, image, price, title, quantity, genre } = props;
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
        <View style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
          <AppText bold>{title}</AppText>
          <AppText bold size={15}>
            by {author_name}
          </AppText>
          <AppText bold size={15}>
            Price: {price} KD
          </AppText>
          <AppText size={15} color='red' >
            {quantity ? null : "OUT OF STOCK"}
          </AppText>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
          <RoundIcon name="heart" type="font-awesome" color="#fff" small />
          <RoundIcon name="share-alt" type="font-awesome" color="#fff" small />
          <RoundIcon name="glide-g" type="font-awesome" color="#fff" small />
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]


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
