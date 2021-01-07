import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  I18nManager,
  TouchableOpacity,
  Text
} from 'react-native';
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

import Loader from 'components/Loader';
import { checkIfLoading } from 'redux/selectors';
import { FETCH_USER_CART } from 'redux/actionTypes';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import NoBookAvailbe from '../../components/NoBookAvailable';
const delivery_charges = 10;
const AddToCart = (props) => {
  const { emptyy } = props
  console.log(props, "PROPS in add to cart")
  const { t } = useTranslation(['Cart'])
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { CartReducer, UserProfileReducer, FetchCurrencyReducer, isLoading } = useSelector((state) => ({
    CartReducer: state.CartReducer,
    FetchCurrencyReducer: state.FetchCurrencyReducer,
    UserProfileReducer: state.UserProfileReducer,
    isLoading: checkIfLoading(state, FETCH_USER_CART),
  }));
  console.log('CartReducer', FetchCurrencyReducer);
  var rtlLayout = false;
  (UserProfileReducer.currency.iso === "USD" || UserProfileReducer.currency.iso === "GBP" || UserProfileReducer.currency.iso === "EUR") && (rtlLayout = true)

  const price_product = FetchCurrencyReducer.find((item) => item.iso === UserProfileReducer.currency.iso)

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

      <Header
        headerLeft
        UpperCase
        headerImage
        backIcon
        {...props}

      />

      <Screen>
        <View key="header"></View>

        <View key="content">
          {(!(CartReducer.book.length + CartReducer.bookmark.length)) ? <NoBookAvailbe emptyy="No items are added In your cart yet" /> : null}
          <Loader loading={isLoading} />

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
                console.log("Carttooooo", CartReducer)
                console.log("quantity", cart_quantity)


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
                        Price: {rtlLayout && price_product.symbol} {parseInt(cart_price).toFixed(2)} {rtlLayout || price_product.symbol}
                      </AppText>
                      <View
                        style={{
                          width: wp(30),
                          height: hp(6),
                          marginBottom: hp(3),
                          marginTop: hp(3),
                          marginLeft: wp(5)
                        }}>
                        <Counter
                          value={cart_quantity}
                          onIncrement={() => updateCartItem(product, 'add')}
                          onDecrement={() => updateCartItem(product, 'sub')}
                        />
                      </View>
                      <HorizontalRow
                        style={{
                          borderColor: 'rgb(200, 200, 200)',
                          borderWidth: hp(0.1),
                          width: wp(40),

                        }}
                      />
                      <TouchableOpacity style={styles.removeContainer} onPress={() => updateCartItem(product, 'remove')}>
                        <Icon
                          size={18}
                          style={{ paddingRight: 30 }}
                          onPress={() => navigation.openDrawer()}
                          color={colors.primary}
                          name="trash-o"
                          type="font-awesome"
                        />
                        <AppText
                          bold
                          size={17}
                          primary
                          style={styles.txt}

                        >
                          Remove
                      </AppText>
                      </TouchableOpacity>

                    </View>
                  </View>
                )

              }),
            )}


          {/* <View style={styles.totalcontainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <AppText style={{ paddingVertical: hp(0.5) }} small bold>
                {t('subTotal')}
              </AppText>
              <AppText style={{ paddingVertical: hp(0.7) }} small bold>
                {t('shippingCharges')}
              </AppText>


              <HorizontalRow
                style={{
                  borderColor: 'rgb(200, 200, 200)',
                  borderWidth: hp(0.1),
                  width: wp(87),


                }}
              />
              <AppText small primary bold>
                {t('total')}
              </AppText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>

              <AppText style={{ paddingVertical: hp(0.5) }} small bold> {rtlLayout && price_product.symbol} {parseFloat(CartReducer.total_price).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText>
              <AppText style={{ paddingVertical: hp(0.5) }} small bold> {rtlLayout && price_product.symbol} {parseFloat(delivery_charges).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText>
              <AppText small primary bold> {rtlLayout && price_product.symbol} {parseFloat(CartReducer.total_price + delivery_charges).toFixed(2)} {rtlLayout || price_product.symbol}
              </AppText>
            </View>
          </View> */}
        </View>
        <View key="footer">
          {(!(CartReducer.book.length + CartReducer.bookmark.length)) ? null :

            <Button
              bold
              primary
              style={styles.footerbtn}
              onPress={() => props.navigation.navigate(CHECKOUT)}>
              {t("checkout")}
            </Button>
          }
        </View>
      </Screen >
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  txt: {
    width: wp(45)
  },

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

    paddingBottom: hp(2),
    borderBottomWidth: hp(0.1),
    borderBottomColor: "rgba(0,0,0,0.5)"
  },
  totalcontainer: {
    flexDirection: 'row',
    flex: 2,
  },
  footerbtn: {
    marginTop: 40,
  },
  author: {
    marginTop: 10,
    fontStyle: 'italic',
  },
  horizontalRow: {
    marginVertical: hp(0.5),
    marginHorizontal: wp(5),
    width: wp(85),
    borderBottomWidth: hp(0.1),
    alignSelf: 'center'
  },
  removeContainer: {
    marginVertical: hp(1),
    flexDirection: 'row'
  }
});

export default AddToCart;
