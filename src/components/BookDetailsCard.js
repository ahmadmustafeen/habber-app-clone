import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {FastImage} from './FastImage';
import {RoundIcon} from './RoundIcon';

const BookDetailsCard = (props) => {
  const {colors} = useTheme();
  const {author, image, price, title} = props;
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <FastImage
          style={styles.image}
          source={require('_assets/images/briefHistory.png')}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'space-between',
          paddingStart: 10,
        }}>
        <View>
          <AppText bold>{title}</AppText>
          <AppText bold size={15}>
            by {author}
          </AppText>
          <AppText bold size={15}>
            Price: {price} KD
          </AppText>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <RoundIcon name="heart" type="font-awesome" color="#fff" small />
          <RoundIcon name="share-alt" type="font-awesome" color="#fff" small />
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
  },
  imgContainer: {
    flex: 2,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginLeft: 10,
    marginTop: 10,
  },
});
export {BookDetailsCard};
