import React, { useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { validateIsTrue } from '../../helpers/Validators';
import { BackHandler } from 'react-native';

const Favorites = (props) => {
  const { t } = useTranslation(['Favorites'])
  const dispatch = useDispatch();
  const Favourites = useSelector((state) => retrieveFavourites(state));
  const Favourite_length = Favourites.book.length + Favourites.bookmark.length
  const onAddToCart = (item) => {
    const { quantity, product_type, id: product_id } = item;
    // validateIsTrue(true, I18nManager.isRTL ? "تمت إضافة العنصر إلى عربة التسوق" : "Item is Added to Cart", false)
    const text = I18nManager.isRTL ? "تمت إضافة العنصر إلى عربة التسوق" : "Item is Added to Cart"
    Platform.OS === 'ios' ?
      Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK' }])
      : (
        I18nManager.isRTL ?
          Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null },])
          : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ' }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
          )
      )

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
  const handleBackButton = () => {
    props.navigation.goBack()
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  }, [])

  const onRemove = ({ id, product_type }) => {
    dispatch(withDataActions({ product_id: id, product_type }, UPDATE_FAVOURITE));
  };

  return (
    <Screen noPadding>
      <View key="header">

        <Header {...props} headerImage />
      </View>

      <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>
        {/* {(!Favourite_length) && <AppText>{t('NoFavorities')}</AppText>}
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
          )} */}

        {(!Favourite_length) && <AppText>{t('NoFavorities')}</AppText>}
        {Favourites.book.map(item => {
          return (
            <FavouriteCard
              onAddToCart={() => onAddToCart(item)}
              item={item}
              onRemove={() => onRemove(item)}
            />
          );
        })}
        {Favourites.bookmark.map(item => {
          return (
            <FavouriteCard
              onAddToCart={() => onAddToCart(item)}
              item={item}
              onRemove={() => onRemove(item)}
            />
          );
        })}


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
