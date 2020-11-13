import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Counter } from '_components';
import { CHECKOUT } from '_constants/Screens';
import { Header } from '_components/Header';
import { withDataActions } from '_redux/actions/GenericActions';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ADD_TO_CART_SAGA } from '_redux/actionTypes';
import { UPDATE_CART_ITEM } from '_redux/actionTypes';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AddToCart = (props) => {
  const { colors } = useTheme()
  const dispatch = useDispatch();
  const CartReducer = useSelector((state) => state.CartReducer);

  const book = CartReducer;
  // dispatch(withDataActions(book.product, ADD_TO_CART_SAGA))

  const updateItemQuantity = (book, type) => {
    if (type === 'add') {
      dispatch(
        withDataActions(
          {
            ...book,
            quantity: book.quantity + 1,
          },
          UPDATE_CART_ITEM,
        ),
      );
    } else {
      dispatch(
        withDataActions(
          {
            ...book,
            quantity: book.quantity > 1 ? book.quantity - 1 : book.quantity,
          },
          UPDATE_CART_ITEM,
        ),
      );
    }
  };

  console.log(CartReducer);
  return (
    <ScrollView>
      <Header {...props} title={'Cart'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          {CartReducer.book &&
            CartReducer.book.map((book) => {
              const { image, title, price, author_name, quantity } = book;
              console.log('QUANTITY', quantity);
              return (
                <View style={styles.profiletop}>
                  <View style={styles.imgContainer}>
                    <Image style={styles.image} source={{ uri: image }} />
                  </View>
                  <View style={styles.viewtxt}>
                    <AppText bold size={18} style={styles.txt}>
                      {title}
                    </AppText>
                    <AppText size={15} style={[styles.txt, styles.author]}>
                      by {author_name}
                    </AppText>
                    <AppText bold size={17} style={styles.pricetxt}>
                      Price: {price} KW
                    </AppText>
                    <View style={{ width: 300, marginVertical: 10 }}>
                      <Counter
                        value={quantity}
                        onIncrement={() => updateItemQuantity(book, 'add')}
                        onDecrement={() => updateItemQuantity(book, 'sub')}
                      />
                    </View>
                    <HorizontalRow style={{ color: 'rgb(200, 200, 200)', borderWidth: hp(0.1), width: wp(45) }} />
                    <AppText bold size={17} primary style={styles.txt}>
                      Remove
                    </AppText>
                  </View>
                </View>
              );
            })}

          <View style={styles.totalcontainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <AppText bold>Sub Total</AppText>
              <AppText bold>Shipping Charges</AppText>
              <AppText primary bold>
                Total
              </AppText>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <AppText bold>$90</AppText>
              <AppText bold>$10</AppText>
              <AppText primary bold>
                $100
              </AppText>
            </View>
          </View>
        </View>
        <View key="footer">
          <Button
            bold
            primary
            style={styles.footerbtn}
            onPress={() => props.navigation.navigate(CHECKOUT)}>
            Checkout
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 220,
    aspectRatio: 0.7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewtxt: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: '100%',
  },
  pricetxt: {
    marginTop: 20,
    width: 200,
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  totalcontainer: {
    flexDirection: 'row',
  },
  footerbtn: {
    marginTop: 40,
  },
  author: {
    marginTop: 10,
    fontStyle: 'italic'
  }
});

export default AddToCart;
