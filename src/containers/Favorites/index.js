import React from 'react';
import { View, StyleSheet, ImageBackground, I18nManager } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { retrieveFavourites } from '../../redux/selectors';
import { withDataActions } from '../../redux/actions';
import { UPDATE_CART_ITEM, UPDATE_FAVOURITE } from '../../redux/actionTypes';
import { FavouriteCard, Header } from '../../components';
import { AppText, Screen } from '../../components/common';

const Favorites = (props) => {
  const dispatch = useDispatch();
  const Favourites = useSelector((state) => retrieveFavourites(state));
  const Favourite_length = Favourites.book.length + Favourites.bookmark.length
  const onAddToCart = (item) => {
    const { quantity, product_type, id: product_id } = item;
    dispatch(
      withDataActions(
        {
          ...item,
          cart_quantity: 1,
          quantity,
          product_id,
          product_type,
          action: 'add',
        },
        UPDATE_CART_ITEM,
      ),
    );
  };

  const onRemove = ({ id, product_type }) => {
    dispatch(withDataActions({ product_id: id, product_type }, UPDATE_FAVOURITE));
  };

  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props} headerImage />
      </View>

      <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
        {(!Favourite_length) && <AppText>No Items in Favourites</AppText>}
        {Object.values(Favourites)
          .filter((key) => Array.isArray(key))
          .map((product_type) =>
            product_type.map((item) => {
              return (
                <FavouriteCard
                  onAddToCart={() => onAddToCart(item)}
                  item={item}
                  onRemove={() => onRemove(item)}
                />
              );
            }),
          )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: hp(21),
    paddingHorizontal: wp(3),
    paddingBottom: hp(8),
    marginBottom: hp(1),
    justifyContent: 'flex-end',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
});

export default Favorites;
