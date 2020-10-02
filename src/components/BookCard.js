import React, {useRef} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {FastImage} from './FastImage';
import {ModalImage} from './ModalImage';
import {BOOK_DETAILS_SCREEN} from '../constants/Screens';

const BookCard = (props) => {
  const {image, author, title, price} = props;
  console.log(props);
  const {colors} = useTheme();

  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => props.navigation.navigate(BOOK_DETAILS_SCREEN)}>
      <View style={styles.containerStyle}>
        <AppText
          bold
          style={{backgroundColor: colors.primary, paddingVertical: 10}}>
          Price : {price}
        </AppText>
        <View style={styles.imageContainer}>
          <FastImage source={{uri: image}} onPress={toggleModal} />
        </View>
        <AppText style={{paddingVertical: 5}}>{title}</AppText>
        <AppText primary bold style={{paddingVertical: 5}}>
          {author}
        </AppText>
        <ModalImage ref={modalRef} source={{uri: image}} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '45%',
    borderWidth: 0.5,
    margin: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
  },
});
export {BookCard};
