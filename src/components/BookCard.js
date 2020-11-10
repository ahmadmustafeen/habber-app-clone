import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
import { BOOK_DETAILS_SCREEN } from '../constants/Screens';

const BookCard = (props) => {
  const { image, author_name, title, price, onPress } = props;
  const { colors } = useTheme();

  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.containerStyle}>
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
    width: '45%',
    borderWidth: 0.5,
    borderColor: 'rgb(200,200,200)',
    margin: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
});
export { BookCard };
