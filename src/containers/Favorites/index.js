import React from 'react';
import { View, StyleSheet, Image, ImageBackground, I18nManager, TouchableOpacity } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Header } from '_components';
import { CART_SCREEN } from '_constants/Screens';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { retrieveFavourites } from '../../redux/selectors';
import { useTheme } from '@react-navigation/native';
import { withDataActions } from '../../redux/actions';
import { REMOVE_FAVOURITE, UPDATE_CART_ITEM, UPDATE_FAVOURITE } from '../../redux/actionTypes';
import { FavouriteCard } from '../../components';









const Favorites = (props) => {

  const dispatch = useDispatch();
  const onAddToCart = (props) => {
    (dispatch(
      withDataActions(
        {
          ...props,
          quantity: 1,
          product_quantity: props.quantity,
          product_id: id,
          action: 'add',
          product_type: 'book',
        },
        UPDATE_CART_ITEM,
      )
    )
    )
  }
  const handleFavouriteClick = (props) => {
    console.log(props)
    dispatch(
      withDataActions(
        { product_id: props.id, product_type: props.product_type }, REMOVE_FAVOURITE,
      ),
    );
    dispatch(
      withDataActions(
        { product_id: props.id, product_type: props.product_type }, UPDATE_FAVOURITE,
      ),
    );
  };
  const {
    Favourites
  } = useSelector((state) => {
    return {
      Favourites: retrieveFavourites(state)
    }
  }, shallowEqual
  )
  return (
    <Screen noPadding>
      <View key="header">
        <ImageBackground
          style={{
            height: hp(21),
            paddingHorizontal: wp(3),
            paddingBottom: hp(8),
            marginBottom: hp(1),
            justifyContent: 'flex-end',
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          }}
          resizeMode='stretch'
          source={require('_assets/images/header.png')}>

          <Header title={"Favourites"} {...props} />


        </ImageBackground>
      </View>
      <View key="content" style={{ width: wp(90), alignSelf: 'center' }}>

        {/* {Object.values(FavouriteReducer)
          .filter((key) => Array.isArray(key))
          .map((product_type) =>
            product_type.map((product) => {
              //   const {
              //     image,
              //     title,
              //     author_name,
              //     cart_price,
              //     cart_quantity,
              //   } = product;
              // }
              console.log("pdasdasd", product)
            }
            ))} */}
        {Favourites.book.map((item) => {
          return (
            <FavouriteCard onAddToCart={() => onAddToCart({ ...item, product_type: 'book' })} item={{ ...item }}

            // handleFavouriteClick={() => handleFavouriteClick({ ...item, product_type: 'book' })} 

            />)
        })}
        {
          Favourites.bookmark.map((item) => {
            return (
              <FavouriteCard onAddToCart={() => onAddToCart({ ...item, product_type: 'bookmark' })} item={{ ...item }}

              // handleFavouriteClick={() => handleFavouriteClick({ ...item, product_type: 'bookmark' })}

              />
            )
          }
          )
        }

        {/* <Book item={{ picture: "../../assets/images/background.jpg", title: "#$@", author: "ADSAS", price: "ASDa" }} /> */}
      </View>
    </Screen >
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: hp(35),
    aspectRatio: 0.6,
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
    maxWidth: wp(50),
  },
  pricetxt: {
    marginTop: 20,
    width: wp(45),
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  author: {
    fontStyle: 'italic',
  },
});

export default Favorites;
