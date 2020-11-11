import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const BookCard = (props) => {
  const { image, author_name, title, price, onPress } = props;
  const { colors } = useTheme();

  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.containerStyle, { borderColor: colors.borderColor }]}>
        <AppText bold style={{ backgroundColor: colors.primary, padding: 10 }}>
          Price : {price}
        </AppText>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: image }} onPress={toggleModal} />
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <AppText>{title}</AppText>
          <AppText primary bold>
            {author_name}
          </AppText>
        </View>
        <ModalImage ref={modalRef} source={{ uri: image }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: wp(40.6),
    borderWidth: 0.5,
    margin: 3,
  },
  imageContainer: {
    width: wp(40.6),
    height: 175,
  },
});
export { BookCard };
