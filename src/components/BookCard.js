import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { FastImage } from './FastImage';
import { ModalImage } from './ModalImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, shallowEqual } from 'react-redux';
const BookCard = (props) => {
  const { image, author_name, title, price, prices, onPress, quantity } = props;

  const {
    UserProfileReducer,
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
    };
  }, shallowEqual);
  console.log(UserProfileReducer, "userPRofile");
  const price_product = prices.find((item) => item.iso === UserProfileReducer.currency.iso)
  // console.log(price_product)


  const { colors } = useTheme();


  const modalRef = useRef(null);

  const toggleModal = () => {
    modalRef.current.toggle();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.containerStyle, { borderColor: colors.borderColor }]}>
        <AppText bold style={{ backgroundColor: colors.primary, padding: 10 }}>
          Price: {parseFloat(price).toFixed(2)} {price_product.iso}
        </AppText>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: image }} onPress={toggleModal} />
        </View>
        <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'space-between', paddingHorizontal: 10, }}>

          <View style={{ width: wp(30) }}>
            <AppText small>{title}</AppText>
            <AppText small primary bold>
              {author_name}
            </AppText>
          </View>

        </View>
        {
          !quantity
          &&
          <>
            <View style={{ position: 'absolute', bottom: hp(6), right: 20, width: 20, height: 30 }}>
              <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/forgetPassword.png")} />
            </View>

            <View style={{ backgroundColor: colors.primary, alignItems: 'center' }}>
              <AppText large>Out of Stock</AppText>
            </View>
          </>
        }
        <ModalImage ref={modalRef} source={{ uri: image }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: wp(41.1),
    borderWidth: 0.5,
    margin: 3,
  },
  imageContainer: {
    width: wp(40.85),
    aspectRatio: 0.9,
  },
});
export { BookCard };
