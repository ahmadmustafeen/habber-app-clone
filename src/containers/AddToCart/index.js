import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {AppText, Button, Screen} from '_components/common';
import {HorizontalRow, Counter} from '_components';
import {CHECKOUT} from '_constants/Screens';
import {Header} from '_components/Header';
import {withDataActions} from '_redux/actions/GenericActions';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {ADD_TO_CART_SAGA} from '_redux/actionTypes';

const AddToCart = (props) => {
  const dispatch = useDispatch();
  const {CartReducer} = useSelector((state) => {
    return {
      CartReducer: state.CartReducer,
    };
  }, shallowEqual);
  // useEffect(() => {
  //   apiAction()
  // }, [])

  const book = CartReducer;
  // dispatch(withDataActions(book.product, ADD_TO_CART_SAGA))

  const addCartItem = (book) => {
    let value = book.quantity + 1;
    const {
      id,
      price,
      description,
      title,
      image,
      author_name,
      typeOfItem,
    } = book;
    dispatch(
      withDataActions(
        {
          id,
          quantity: value,
          price,
          description,
          title,
          image,
          author_name,
          typeOfItem,
        },
        ADD_TO_CART,
      ),
    );
  };
  const subtractCartItem = (book) => {
    book.quantity - 1 !== 0
      ? (value = book.quantity - 1)
      : (value = book.quantity);
    const {
      id,
      price,
      description,
      title,
      image,
      author_name,
      typeOfItem,
    } = book;
    dispatch(
      withDataActions(
        {
          id,
          quantity: value,
          price,
          description,
          title,
          image,
          author_name,
          typeOfItem,
        },
        ADD_TO_CART,
      ),
    );
  };

  return (
    <ScrollView>
      <Header {...props} title={'Cart'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          {CartReducer.product.map((book) => {
            const {image, title, price, author_name, quantity} = book;
            console.log(image);
            return (
              <View style={styles.profiletop}>
                <View style={styles.imgContainer}>
                  <Image style={styles.image} source={{uri: image}} />
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
                  <View style={{width: 300, marginVertical: 10}}>
                    <Counter
                      value={quantity}
                      onIncrement={() => addCartItem(book)}
                      onDecrement={() => subtractCartItem(book)}
                    />
                  </View>
                  <HorizontalRow />
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
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
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
});

export default AddToCart;
