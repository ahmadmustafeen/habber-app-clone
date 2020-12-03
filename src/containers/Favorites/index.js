import React from 'react';
import { View, StyleSheet, Image, ImageBackground, I18nManager } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Header } from '_components';
import { CART_SCREEN } from '_constants/Screens';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, shallowEqual } from 'react-redux';
import { retrieveFavourites } from '../../redux/selectors';


const Book = (props) => {


  return (
    <>
      <View style={styles.profiletop}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={{ uri: props.item.image }}
          />
        </View>

        <View style={styles.viewtxt}>
          <AppText bold size={17} style={styles.txt}>
            {props.item.title}
          </AppText>
          <AppText bold size={13} style={[styles.txt, styles.author]}>
            {props.item.author_name}
          </AppText>
          <AppText bold size={17} style={styles.pricetxt}>
            Price:  {props.item.price} KW
      </AppText>
          <Button
            bold
            fontSize={15}
            primary
            color="black"
            style={styles.pricetxt}
            onPress={() => props.navigation.navigate(CART_SCREEN)}
            round>
            Add To Cart
      </Button>
          <HorizontalRow
            style={{
              borderColor: 'rgb(200,200,200)',
              borderWidth: 1,
              marginVertical: hp(2),
            }}
          />
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              containerStyle={{ paddingRight: wp(5) }}
              size={22}
              color='black'
              name='trash-o'
              type='font-awesome'
            />
            <AppText bold size={17} primary style={styles.txt}>
              Remove
        </AppText>
          </View>
        </View>
      </View>
      <HorizontalRow style={{ borderColor: 'rgb(200,200,200)', borderWidth: 1, marginVertical: hp(2), }} />
    </>
  )
}




const Favorites = (props) => {
  const {
    FavouriteReducer, ArabicBooksReducer, EnglishBooksReducer, Favourites
  } = useSelector((state) => {
    return {
      FavouriteReducer: state.FavouriteReducer,
      ArabicBooksReducer: state.ArabicBooksReducer,
      EnglishBooksReducer: state.EnglishBooksReducer,
      Favourites: retrieveFavourites(state)
    }
  }, shallowEqual
  )
  console.log("Favourites", Favourites);
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
              console.log(product)
            }))
        } */}

        {FavouriteReducer.book.map((item) => {

          var bookdetail = ("adsasd", EnglishBooksReducer.filter(e => e.id === item.product_id));

          return (
            <Book item={{ picture: bookdetail.image, title: bookdetail.title, author: bookdetail, price: "ASDa" }} />
          )

          // console.logfilter((item) => ArabicBookListRe00))


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
