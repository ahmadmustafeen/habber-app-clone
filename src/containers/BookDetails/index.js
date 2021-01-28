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
import { NofeaturedBook } from '../../components/NofeaturedBook';
import { Platform } from 'react-native';

const BookDetails = (props) => {
  const { t } = useTranslation(["BookDetails"]);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  var book = null
  var product_type2 = null
  var id2 = null
  if (props.route.params) product_type2 = props.route.params.product_type
  if (props.route.params) id2 = props.route.params.id
  const {
    UserProfileReducer2,
    EnglishBooksReducer2,
    ArabicBooksReducer2,
    BookmarksReducer2,
    BookClubReducer2,
    FetchSiteReducer2,
    BannerReducer
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer,
      EnglishBooksReducer2: state.EnglishBooksReducer,
      ArabicBooksReducer2: state.ArabicBooksReducer,
      BookmarksReducer2: state.BookmarksReducer,
      BookClubReducer2: state.BookClubReducer,
      BannerReducer: state.BannerReducer,

    };
  }, shallowEqual);
  if (product_type2 === 'bookmark') book = (BookmarksReducer2.find((item) => item.id == id2))
  if (product_type2 === 'bookclub') book = (BookClubReducer2.find((item) => item.id == id2))
  const CombinedReducer = [...ArabicBooksReducer2, ...EnglishBooksReducer2]
  if (product_type2 === 'book') book = (CombinedReducer.find((item) => item.id == id2))


  if (book === null) book = props.route.params;
  // (book.product_type === 'bookclub') ? book = book.book : null
  var { id: product_id = 33, quantity, product_type, price, bookClub, type } = book;
  var old_product;
  var book_removed = false
  if (book.product_type === 'bookclub' && book.book) {
    product_id = book.book.id;
    quantity = book.book.quantity;
    price = book.book.price;
    type = 'bookclub';
    product_type = 'book';
    old_product = book;
    book = book.book
  }
  else if (book.product_type === 'bookclub' && !book.book) {
    product_id = book.id,
      product_type = 'book'
    book_removed = true,
      type = "bookclub"
    old_product = book
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
  let inCartPosition = CartReducer[product_type].findIndex(
    (el) => el.product_id === product_id,
  );
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
      Alert.alert(I18nManager.isRTL ? "الرجاء إضافة الكمية" : "Please add quantity");
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
        // cdmessage: "Habber",
        message:
          Platform.OS === 'ios' ?
            ('habber://BookDetails/' + (type ? old_product.id : product_id) + "/" + (type ? type : product_type)) :
            (('http://sturdycyber.cf/index.php?id=' + (type ? old_product.id : product_id) + "&type=" + (type ? type : product_type)))
        // <iframe src="paulsawesomeapp://page1"> </iframe>
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
            title={(type ? props.route.params.name : true)}
            color={colors.secondary}
          />
          {(!type && (product_type === 'book' || product_type === 'bookmark')) ?
            (

              <View
                style={{ width: wp(90), paddingTop: hp(2), alignSelf: 'center' }}>
                <BookDetailsCard
                  subheading
                  onClickFavourite={handleFavouriteClick}
                  favourite={isFavourite}
                  {...book}
                  onClickShare={onShare}
                  onGoodReads={product_type === 'book' ? () => Linking.openURL('https://www.goodreads.com/book/isbn/' + book.isbn)
                    : null}
                />
              </View>)
            : (
              <View
                style={{
                  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                  width: wp(90), alignSelf: 'center', paddingBottom: 20, height: hp(22)
                }}>
                <Image
                  // style={{ width: wp(90),  }}
                  style={{ width: "100%", height: '100%' }}
                  source={{ uri: old_product.banner_image }}
                />
              </View>
            )}
        </ImageBackground>
      </View>
      <View key="content">
        {book_removed && <NofeaturedBook unavailabetitle={I18nManager.isRTL ? "الكتاب المميز غير متوفر حاليًا" : "THE FEATURED BOOK IS CURRENTLY UNAVAILABLE"}
          source={require("../../assets/images/nofeatured.png")} />}

        {(type === 'bookclub' && !book_removed) &&
          (
            <View style={{ paddingTop: hp(3), transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], }}>
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
        {!book_removed &&
          <HorizontalRow style={styles.row} />
        }
        <View >
          {((product_type !== 'bookmark')) ? (!book_removed && (
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
          )
          ) : (
              <>
                <AppText style={styles.infoProduct} bold primary size={15}>
                  {t("productId")}: {book.bookmark_id}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  {t("sizeInInches")} : {book.size}
                </AppText>
                <AppText style={styles.infoProduct} bold size={15}>
                  {t("typeOfBookmark")} : {book.type_of_bookmark}
                </AppText>
              </>
            )}
        </View>
        {!book_removed && <HorizontalRow style={styles.row} />}
        <View style={{ marginTop: 20, minHeight: hp(20) }}>
          {!book_removed &&
            <AppText bold style={{ marginBottom: 10 }}>
              {t('description')}
            </AppText>
          }
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
        {!book_removed &&
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
        }
        {(type !== 'bookclub') ? (
          <View
            style={{
              width: wp(90),
              alignSelf: 'center',
              paddingVertical: hp(2),
            }}>
            {true && <>
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
                            // product_type: 'book'
                            // product_type: "bookmark",
                          });
                        }}
                        url={item.item.image}
                      />
                    );
                  }}
                />

              </View>
            </>}

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
                {true &&
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
                }
              </View>
            </View>
          )
        }
      </View >
    </Screen >
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
