import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  I18nManager,
  FlatList,
  Alert,
  Image,
} from 'react-native';
// import { ThumbnailClub } from '_components/ThumbnailClub';
import { AppText, Button, Screen } from '../../components/common';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
  DashboardComponent,
  RelatedThumbnailClub,
  RelatedThumbnailBook,
  RelatedThumbnailBookmarks,
  ThumbnailClub,
  ThumbnailBook,
  ThumbnailBookmarks,
} from '../../components';
import { Icon } from 'react-native-elements';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CART_SCREEN, BOOK_DETAILS_SCREEN } from '../../constants/Screens';
import {
  ADD_TO_CART,
  FETCH_RELATED_BOOKS,
  UPDATE_FAVOURITE,
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
  UPDATE_CART_ITEM,
} from '_redux/actionTypes';
import { withDataActions } from '_redux/actions/GenericActions';

import { useTheme } from '@react-navigation/native';

const BookDetails = (props) => {
  console.log("props", props)
  const { EnglishBooksReducer } = useSelector((state) => {
    return {
      EnglishBooksReducer: state.EnglishBooksReducer,
    };
  }, shallowEqual);
  const { params: book } = props.route;
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const { CartReducer, FetchRelatedBookList, FavouriteReducer } = useSelector(
    ({ CartReducer, FetchRelatedBookList, FavouriteReducer }) => {
      return {
        CartReducer,
        FetchRelatedBookList,
        FavouriteReducer,
      };
    },
  );

  var { id: product_id, quantity, product_type, price, bookClub, type } = book;
  product_type === 'bookclub' &&
    ((product_id = book.book.id),
      (quantity = book.book.quantity),
      (price = book.book.price),
      (type = 'bookclub'),
      (product_type = 'book'));
  console.log([book])

  let inCartPosition = CartReducer[product_type].findIndex(
    (el) => el.product_id === product_id,
  );
  let checkIsFavourite = FavouriteReducer[product_type].some(
    (el) => el.product_id === product_id,
  );
  const handleCounter = (action) => {
    //TODO : For restrict counter for maximum quantity and out of stock..

    dispatch(
      withDataActions(
        {
          ...book,
          quantity: 1,
          product_quantity: quantity,
          product_id,
          action,
        },
        UPDATE_CART_ITEM,
      ),
    );
  };

  const onAddToCart = () => {
    if (
      inCartPosition === -1 ||
      CartReducer[product_type][inCartPosition].cart_quantity === 0
    ) {
      Alert.alert('Please add quantity');
      return;
    }

    dispatch(
      withDataActions(CartReducer[product_type][inCartPosition], ADD_TO_CART),
    );
  };

  useEffect(() => {
    dispatch(withDataActions({ product_id }, FETCH_RELATED_BOOKS));
  }, []);

  const handleFavouriteClick = () => {
    dispatch(
      withDataActions({ product_id, type: product_type }, UPDATE_FAVOURITE),
    );
    dispatch(
      withDataActions(
        { product_id, product_type },
        !checkIsFavourite ? ADD_TO_FAVOURITE : REMOVE_FAVOURITE,
      ),
    );
  };
  console.log('quantity', book);

  return (
    <Screen noPadding contentPadding>
      <View key="header">
        <ImageBackground
          style={{
            flex: 1,
            paddingHorizontal: 10,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
          source={require('_assets/images/book-detail.png')}>
          <Header
            {...props}
            headerLeft={
              <Icon
                onPress={() => props.navigation.goBack()}
                color={colors.black}
                name="leftcircleo"
                type="ant-design"
              />
            }
            title
            color={colors.secondary}
          />
          {type !== 'bookclub' ? (
            <BookDetailsCard
              onClickFavourite={handleFavouriteClick}
              favourite={checkIsFavourite}
              {...book}
            />
          ) : (
              <View
                style={{ width: wp(90), alignSelf: 'center', paddingBottom: 20 }}>
                <Image
                  style={{ width: wp(90), height: hp(18) }}
                  source={require('_assets/images/splash.png')}
                />
              </View>
            )}
        </ImageBackground>
      </View>
      <View key="content">
        {type === 'bookclub' && (
          <View style={{ paddingTop: hp(3) }}>
            <BookDetailsCard
              onClickFavourite={handleFavouriteClick}
              favourite={checkIsFavourite}
              {...book.book}
            />
          </View>
        )}
        <HorizontalRow style={styles.row} />
        <View>
          {product_type !== 'bookmark' ? (
            <>
              <AppText style={styles.infoProduct} bold size={15} primary>
                ISBN: {book.isbn}
              </AppText>
              <AppText style={styles.infoProduct} bold size={15}>
                Pages: {book.total_pages}
              </AppText>
              <AppText style={styles.infoProduct} bold size={15}>
                Type of Cover: {book.cover_type}
              </AppText>
              <AppText style={styles.infoProduct} bold size={15}>
                Genre: Romance|Thriller|Mystery
              </AppText>
            </>
          ) : (
              <>
                <AppText style={styles.infoProduct} bold primary size={15}>
                  Product Id: {book.bookmark_id}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  Size in (inch): {book.size}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  Type of Bookmark: {book.cover_type}
                </AppText>
              </>
            )}
        </View>
        <HorizontalRow style={styles.row} />
        <View style={{ marginTop: 20, minHeight: hp(20) }}>
          <AppText bold style={{ marginBottom: 10 }}>
            Description:
          </AppText>
          <AppText size={14}>{book.description}</AppText>
        </View>
      </View>
      <View key="footer" style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={styles.counter}>
          {quantity ?
            <Counter
              onIncrement={() => handleCounter('add')}
              onDecrement={() => handleCounter('sub')}
              value={
                (inCartPosition !== -1)
                  ? CartReducer[product_type][inCartPosition].cart_quantity
                  : '0'
              }
            />
            : null}
        </View>

        <Button bold color={colors.white} outOfStock={!quantity} secondary onPress={() => { (quantity) && onAddToCart() }}>
          {quantity ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <View
          style={{ width: wp(90), alignSelf: 'center', paddingVertical: hp(2) }}>
          <AppText>More {type || product_type}s</AppText>
          <View style={{ paddingVertical: hp(2) }}>
            <DashboardComponent
              noTitle
              data={EnglishBooksReducer.filter((book) => book.featured)}
              renderComponent={(item) => {
                if (type === 'bookclub') {
                  return <RelatedThumbnailClub onPress={() => {
                    props.navigation.push(BOOK_DETAILS_SCREEN, {
                      ...item.item, product_type: type
                    })
                  }
                  }
                    url={item.item.image} />;
                }
                if (product_type === 'book') {
                  console.log(item.item);
                  return <RelatedThumbnailBook onPress={() => {
                    props.navigation.push(BOOK_DETAILS_SCREEN, {
                      ...item.item, product_type
                    })
                  }
                  }
                    url={item.item.image} />;
                }
                return <RelatedThumbnailBookmarks
                  onPress={() => {
                    props.navigation.push(BOOK_DETAILS_SCREEN, {
                      ...item.item, product_type
                    })
                  }
                  }
                  url={item.item.image} />;
              }}

            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  row: {
    borderColor: 'rgb(200,200,200)',
    borderBottomWidth: 1,
    marginVertical: hp(2),
  },
  infoProduct: {
    paddingVertical: hp(0.1),
  },
});

export default BookDetails;
