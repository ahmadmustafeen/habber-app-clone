import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {FastImage} from './FastImage';

const BookDetailsCard = (props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.containerStyle}>
      <View style={styles.imageContainer}>
        <FastImage source={require('../assets/images/background.jpg')} />
      </View>
      <View style={styles.textContainer}>
        <AppText style={{paddingVertical: 5}}>stitles</AppText>
        <AppText primary bold style={{paddingVertical: 5}}>
          aauthors
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
  },
});
export {BookDetailsCard};
