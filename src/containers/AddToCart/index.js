import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Counter } from '_components';
import { CHECKOUT } from '_constants/Screens';
import { Header } from '_components/Header';
import { withDataActions } from '_redux/actions/GenericActions';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'

import { ADD_TO_CART } from '_redux/actionTypes';


const AddToCart = (props) => {

  const dispatch = useDispatch()
  const { CartReducer } = useSelector((state) => {

    return {

      CartReducer: state.CartReducer,
    };
  }, shallowEqual);
  const addCartItem = (book) => {
    let value = book.quantity + 1
    const { isbn, price, description, title, image, author_name, typeOfItem } = book
    dispatch(withDataActions({ isbn, quantity: value, price, description, title, image, author_name, typeOfItem }, ADD_TO_CART))
  }
  const subtractCartItem = (book) => {
    let value = book.quantity - 1
    const { isbn, price, description, title, image, author_name, typeOfItem } = book
    dispatch(withDataActions({ isbn, quantity: value, price, description, title, image, author_name, typeOfItem }, ADD_TO_CART))
  }

  // const BookSection = (props) => {
  //   <View style={styles.profiletop}>
  //   <View style={styles.imgContainer}>
  //     <Image
  //       style={styles.image}
  //       source={require('../../assets/images/background.jpg')}
  //     />
  //   </View>

  //   <View style={styles.viewtxt}>
  //     <AppText bold size={20} style={styles.txt}>
  //         A Brief History of time
  //     </AppText>
  //     <AppText bold size={15} style={styles.txt}>
  //         by brom
  //     </AppText>
  //     <AppText bold size={20} style={styles.pricetxt}>
  //         Price: 30 KW
  //     </AppText>
  //     <View style={{ width: 300, marginVertical: 10 }}>
  //       <Counter />
  //     </View>
  //     <HorizontalRow />
  //     <AppText bold size={17} primary style={styles.txt}>
  //         Remove
  //     </AppText>
  //   </View>
  // </View>
  // <HorizontalRow />
  // }
  return (
    <ScrollView>
      <Header {...props} title={'Cart'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          {CartReducer.product.map((book) => {
            const { image, title, price, author_name, quantity } = book;
            console.log(image);
            return (< View style={styles.profiletop} >
              <View style={styles.imgContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: image }}
                />
              </View>
              <View style={styles.viewtxt}>
                <AppText bold size={20} style={styles.txt}>
                  {title}
                </AppText>
                <AppText bold size={15} style={styles.txt}>
                  by {author_name}
                </AppText>
                <AppText bold size={20} style={styles.pricetxt}>
                  Price: {price} KW
              </AppText>
                <View style={{ width: 300, marginVertical: 10 }}>
                  <Counter value={quantity} onIncrement={() => addCartItem(book)} onDecrement={() => subtractCartItem(book)} />
                </View>
                <HorizontalRow />
                <AppText bold size={17} primary style={styles.txt}>
                  Remove
              </AppText>
              </View>

            </View>)


          })
          }

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
    </ScrollView >
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
});

export default AddToCart;
