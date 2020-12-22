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
  var rtlLayout = false;
  (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)

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
          Price: {rtlLayout && price_product.symbol} {parseFloat(price).toFixed(2)} {rtlLayout || price_product.symbol}
        </AppText>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: image }} onPress={toggleModal} />
        </View>
        <View style={styles.details}>

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
            <View style={styles.forgetPassImageContainet}>
              <Image style={styles.image} source={require("../assets/images/forgetPassword.png")} />
            </View>

            <View style={[styles.outOfStock, { backgroundColor: colors.primary }]}>
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
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: wp(40.85),
    aspectRatio: 0.9,
  },
  forgetPassImageContainet: {
    position: 'absolute',
    bottom: hp(6),
    right: 20,
    width: 20,
    height: 30
  },
  details: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  outOfStock: {
    alignItems: 'center'
  }
});
export { BookCard };
