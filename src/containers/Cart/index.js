import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {AppText, Button, Screen} from '_components/common';
import {HorizontalRow, Counter} from '_components';
import {CHECKOUT} from '_constants/Screens';
import {Header} from '_components/Header';
import {withDataActions} from '_redux/actions/GenericActions';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {ADD_TO_CART_SAGA} from '_redux/actionTypes';
import {UPDATE_CART_ITEM} from '_redux/actionTypes';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const delivery_charges = 10;
const AddToCart = (props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const CartReducer = useSelector((state) => state.CartReducer);
  console.log('CartReducer', CartReducer);

  const updateCartItem = (book, action) => {
    dispatch(
      withDataActions(
        {
          ...book,
          action,
        },
        UPDATE_CART_ITEM,
      ),
    );
  };
  return (
    <ScrollView>
      <ImageBackground
        style={{
          height: hp(21),
          paddingHorizontal: wp(3),
          paddingBottom: hp(8),
          marginBottom: hp(1),
          justifyContent: 'flex-end',
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
        resizeMode="stretch"
        source={require('_assets/images/header.png')}>
        <Header {...props} title={'Cart'} />
      </ImageBackground>

      <Screen>
        <View key="header"></View>
        <View key="content">
          {Object.values(CartReducer)
            .filter((key) => Array.isArray(key))
            .map((product_type) =>
              product_type.map((product) => {
                const {
                  image,
                  title,
                  author_name,
                  cart_price,
                  cart_quantity,
                } = product;
                return (
                  <View style={styles.profiletop}>
                    <View style={styles.imgContainer}>
                      <Image style={styles.image} source={{uri: image}} />
                    </View>
                    <View style={styles.viewtxt}>
                      <AppText bold size={18} style={styles.txt}>
                        {title}
                      </AppText>
                      <AppText size={15} style={[styles.txt, styles.author]}>
                        by {author_name}
                      </AppText>
                      <AppText bold size={17} style={styles.pricetxt}>
                        Price: {cart_price} KW
                      </AppText>
                      <View style={{width: 300, marginVertical: 10}}>
                        <Counter
                          value={cart_quantity}
                          onIncrement={() => updateCartItem(product, 'add')}
                          onDecrement={() => updateCartItem(product, 'sub')}
                        />
                      </View>
                      <HorizontalRow
                        style={{
                          color: 'rgb(200, 200, 200)',
                          borderWidth: hp(0.1),
                          width: wp(45),
                        }}
                      />
                      <AppText
                        bold
                        size={17}
                        primary
                        style={styles.txt}
                        onPress={() => updateCartItem(product, 'remove')}>
                        Remove
                      </AppText>
                    </View>
                  </View>
                );
              }),
            )}

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
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <AppText bold>{CartReducer.total_price} KW</AppText>
              <AppText bold>{delivery_charges} KW</AppText>
              <AppText primary bold>
                {CartReducer.total_price + delivery_charges} KW
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
    fontStyle: 'italic',
  },
});

export default AddToCart;
