import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  I18nManager,
  FlatList,
  Alert,
} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
  DashboardComponent,
  ThumbnailClub,
} from '../../components';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CART_SCREEN} from '../../constants/Screens';
import {
  ADD_TO_CART,
  FETCH_RELATED_BOOKS,
  UPDATE_FAVOURITE,
  ADD_TO_FAVOURITE,
  REMOVE_FAVOURITE,
} from '_redux/actionTypes';
import {withDataActions} from '_redux/actions/GenericActions';

import {useTheme} from '@react-navigation/native';
import {UPDATE_CART_ITEM} from 'redux/actionTypes';

const BookDetails = (props) => {
  const {params: book} = props.route;
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const {CartReducer, FetchRelatedBookList, FavouriteReducer} = useSelector(
    ({CartReducer, FetchRelatedBookList, FavouriteReducer}) => {
      return {
        CartReducer,
        FetchRelatedBookList,
        FavouriteReducer,
      };
    },
  );

  const {id: product_id, quantity, product_type, price} = book;

  let inCartPosition = CartReducer[product_type].findIndex(
    (el) => el.product_id === product_id,
  );
  let isFavourite = FavouriteReducer[product_type].some(
    (el) => el.product_id === product_id,
  );
  const handleCounter = (action) => {
    //TODO : For restrict counter for maximum quantity and out of stock..

    dispatch(
      withDataActions(
        {
          ...book,
          quantity: 1,
          product_id,
          action,
          product_price: price,
        },
        UPDATE_CART_ITEM,
      ),
    );
  };

  const onAddToCart = () => {
    if (
      inCartPosition === -1 ||
      CartReducer[product_type][inCartPosition].quantity === 0
    ) {
      Alert.alert('Please add quantity');
      return;
    }

    dispatch(
      withDataActions(CartReducer[product_type][inCartPosition], ADD_TO_CART),
    );
  };

  useEffect(() => {
    dispatch(withDataActions({product_id}, FETCH_RELATED_BOOKS));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(
        withDataActions(
          {product_id, type: product_type},
          isFavourite ? ADD_TO_FAVOURITE : REMOVE_FAVOURITE,
        ),
      );
    };
  }, [isFavourite]);

  const handleFavouriteClick = () => {
    dispatch(
      withDataActions({product_id, type: product_type}, UPDATE_FAVOURITE),
    );
  };

  return (
    <Screen noPadding contentPadding>
      <View key="header">
        <ImageBackground
          style={{
            flex: 1,
            paddingHorizontal: 10,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
          source={require('_assets/images/book-detail.png')}>
          <Header {...props} noTitle color={colors.secondary} />
          <BookDetailsCard
            onClickFavourite={handleFavouriteClick}
            favourite={isFavourite}
            {...book}
          />
        </ImageBackground>
      </View>
      <View key="content">
        <HorizontalRow />
        <View>
          <AppText bold size={15} primary>
            ISBN: {book.isbn}
          </AppText>
          <AppText bold size={15}>
            Pages: {book.total_pages}
          </AppText>
          <AppText bold size={15}>
            Type of Cover: {book.cover_type}
          </AppText>
          <AppText bold size={15}>
            Genre: Romance|Thriller|Mystery
          </AppText>
        </View>
        <HorizontalRow />
        <View style={{marginTop: 20}}>
          <AppText bold style={{marginBottom: 10}}>
            Description:
          </AppText>
          <AppText size={14}>{book.description}</AppText>
        </View>
      </View>
      <View key="footer">
        <View style={styles.counter}>
          {quantity && (
            <Counter
              onIncrement={() => handleCounter('add')}
              onDecrement={() => handleCounter('sub')}
              value={
                inCartPosition !== -1
                  ? CartReducer[product_type][inCartPosition].quantity
                  : '0'
              }
            />
          )}
        </View>

        <Button bold color={colors.white} secondary onPress={onAddToCart}>
          {quantity ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <View style={{width: wp(90), alignSelf: 'center'}}>
          <AppText>More BookClubs</AppText>
          <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={FetchRelatedBookList}
            keyExtractor={(item, index) => index.toString() + item}
            ListEmptyComponent={() => (
              <View>
                <AppText>No Book Available</AppText>
              </View>
            )}
          />
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
});

export default BookDetails;
