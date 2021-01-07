import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  I18nManager,
  Alert,
  Image, Linking,
  Share,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useTheme } from '@react-navigation/native';

import { AppText, Button, Screen } from '../../components/common';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
  DashboardComponent,
  RelatedThumbnailBook,
  RelatedThumbnailBookmarks,
} from '../../components';
import { BDScreenText } from './components';
import { BOOK_DETAILS_SCREEN } from '../../constants/Screens';
import {
  ADD_TO_CART,
  FETCH_RELATED_BOOKS,
  UPDATE_FAVOURITE,
  UPDATE_CART_ITEM,
} from '_redux/actionTypes';
import { withDataActions } from '../../redux/actions/GenericActions';
import { checkIsFavourite } from '../../redux/selectors';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

const BookDetails = (props) => {
  // console.log("bookdetail", props, "delete")
  const { t } = useTranslation(["BookDetails"]);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  console.log("props", props)
  var { params: book } = props.route;
  // (book.product_type === 'bookclub') ? book = book.book : null

  var { id: product_id = 33, quantity, product_type, price, bookClub, type } = book;
  var old_product;
  console.log(book, "BOOKADASDASWDASDFDFDRGDFHFJ")
  if (book.product_type === 'bookclub') {
    product_id = book.book.id;
    quantity = book.book.quantity;
    price = book.book.price;
    type = 'bookclub';
    product_type = 'book';
    old_product = book;
    book = book.book
  }

  useEffect(() => {
    dispatch(withDataActions({ product_id }, FETCH_RELATED_BOOKS));
  }, []);

  const {
    CartReducer,
    FetchRelatedBookList,
    FavouriteReducer,
    EnglishBooksReducer,
    isFavourite,
  } = useSelector(
    ({
      CartReducer,
      FetchRelatedBookList,
      EnglishBooksReducer,
      FavouriteReducer,
    }) => {
      return {
        CartReducer,
        FetchRelatedBookList,
        FavouriteReducer,
        EnglishBooksReducer,
        isFavourite: checkIsFavourite(FavouriteReducer, {
          product_id,
          product_type,
        }),
      };
    },
  );
  // if (product_type === 'bookclub') {
  //   product_id = book.book.id;
  //   quantity = book.book.quantity;
  //   price = book.book.price;
  //   type = 'bookclub';
  //   product_type = 'book';
  // }

  let inCartPosition = CartReducer[product_type].findIndex(
    (el) => el.product_id === product_id,
  );
  console.log("props.route.params.book", props.route.params.book)
  const handleCounter = (action) => {
    //TODO : For restrict counter for maximum quantity and out of stock..

    dispatch(
      withDataActions(
        {
          ...book,
          cart_quantity: 1,
          quantity,
          product_id,
          action,
          product_type,
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

  const handleFavouriteClick = () => {
    dispatch(withDataActions({ product_id, product_type }, UPDATE_FAVOURITE));
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
            cartNumber={CartReducer.book.length + CartReducer.bookmark.length}
            {...props}
            headerLeft={
              <Icon
                onPress={() => props.navigation.goBack()}
                color={colors.black}
                name="leftcircleo"
                type="ant-design"
              />
            }
            title={(type ? props.route.params.book.title : true)}
            color={colors.secondary}
          />
          {type !== 'bookclub' ?
            (

              <View
                style={{ width: wp(90), paddingTop: hp(2), alignSelf: 'center' }}>
                <BookDetailsCard
                  onClickFavourite={handleFavouriteClick}
                  favourite={isFavourite}
                  {...book}
                  onClickShare={onShare}
                  onGoodReads={product_type === 'book' ? () => Linking.openURL('https://www.goodreads.com/book/isbn/' + book.isbn) : null}
                />
              </View>
            )
            : (
              <View
                style={{ width: wp(90), alignSelf: 'center', paddingBottom: 20 }}>
                <Image
                  style={{ width: wp(90), height: hp(18) }}
                  source={{ url: old_product.image }}
                />
              </View>
            )}
        </ImageBackground>
      </View>
      <View key="content">
        {type === 'bookclub' &&
          (
            <View style={{ paddingTop: hp(3) }}>
              <BookDetailsCard
                onClickFavourite={handleFavouriteClick}
                favourite={isFavourite}
                onClickShare={onShare}
                onGoodReads={() => Linking.openURL('https://www.goodreads.com/book/isbn/' + book.isbn)}
                {...book}
              />
            </View>
          )
        }
        <HorizontalRow style={styles.row} />
        <View>
          {product_type !== 'bookmark' ? (
            <>
              <BDScreenText primary title={t('isbn')} value={book.isbn} />
              <BDScreenText title={t('totalPages')} value={book.total_pages} />
              <BDScreenText title={t('coverType')} value={book.cover_type} />
              <BDScreenText
                capitalize
                title={t("genre")}
                value={book.genre.map((item) => item.title).join(' | ')}
              />
            </>
          ) : (
              <>
                <AppText style={styles.infoProduct} bold primary size={15}>
                  Product ID: {book.bookmark_id}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  Size in (inch): {book.size}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  Type of Bookmark: {book.type_of_bookmark}
                </AppText>
              </>
            )}
        </View>
        <HorizontalRow style={styles.row} />
        <View style={{ marginTop: 20, minHeight: hp(20) }}>
          <AppText bold style={{ marginBottom: 10 }}>
            {t('description')}
          </AppText>
          <AppText size={14}>{book.description}</AppText>
        </View>
      </View>
      <View key="footer" style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={styles.counter}>
          {quantity ? (
            <Counter
              onIncrement={() => handleCounter('add')}
              onDecrement={() => handleCounter('sub')}
              value={
                inCartPosition !== -1
                  ? CartReducer[product_type][inCartPosition].cart_quantity
                  : '0'
              }
            />
          ) : null}
        </View>

        <View style={{ width: wp(75), alignSelf: 'center' }}>
          <Button
            bold
            color={colors.white}
            outOfStock={!quantity}
            inStock={!!quantity}
            secondary
            onPress={() => {
              quantity && onAddToCart();
            }}>
            {quantity ? t('addToCart') : t('outOfStock')}
          </Button>
        </View>

        {type !== 'bookclub' ? (
          <View
            style={{
              width: wp(90),
              alignSelf: 'center',
              paddingVertical: hp(2),
            }}>
            <AppText> {t("youMayAlsoLike")}</AppText>
            <View style={{ paddingVertical: hp(2) }}>
              <DashboardComponent
                noTitle
                data={EnglishBooksReducer.filter((book) => book.featured)}
                renderComponent={(item) => {
                  if (product_type === 'book') {
                    return (
                      <RelatedThumbnailBook
                        onPress={() => {
                          props.navigation.push(BOOK_DETAILS_SCREEN, {
                            ...item.item,
                            product_type,
                          });
                        }}
                        url={item.item.image}
                      />
                    );
                  }
                  return (
                    <RelatedThumbnailBookmarks
                      onPress={() => {
                        props.navigation.push(BOOK_DETAILS_SCREEN, {
                          ...item.item,
                          product_type,
                        });
                      }}
                      url={item.item.image}
                    />
                  );
                }}
              />
            </View>
          </View>
        ) : (

            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
                paddingVertical: hp(2),
              }}>
              <AppText> {t("morebookclubs")}</AppText>
              <View style={{ paddingVertical: hp(2) }}>
                <DashboardComponent
                  noTitle
                  data={FetchRelatedBookList.filter((book) => book.featured)}
                  renderComponent={(item) => {
                    if (product_type === 'book') {
                      return (
                        <RelatedThumbnailBook
                          onPress={() => {
                            props.navigation.push(BOOK_DETAILS_SCREEN, {
                              ...item.item,
                              product_type,
                            });
                          }}
                          url={item.item.image}
                        />
                      );
                    }
                    return (
                      <RelatedThumbnailBookmarks
                        onPress={() => {
                          props.navigation.push(BOOK_DETAILS_SCREEN, {
                            ...item.item,
                            product_type,
                          });
                        }}
                        url={item.item.image}
                      />

                    );
                  }}
                />
              </View>
            </View>
          )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    height: hp(6),
    width: wp(40),
    alignSelf: 'center'
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
