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
  BookClub,
  ThumbnailClub,
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
import { BackHandler } from 'react-native';
import { ScrollView } from 'react-native';

const BookDetails = (props) => {


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

  const { t } = useTranslation(["BookDetails"]);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  console.log("BOOK DETAILS", props)
  var book = null
  var product_type2 = null
  var id2 = null
  if (props.route.params) product_type2 = props.route.params.product_type
  if (props.route.params) id2 = props.route.params.id
  const {
    UserProfileReducer2,
    EnglishBooksReducer2,
    ArabicBooksReducer2,
    BookmarksReducer2, BookmarksReducer,
    BookClubReducer,
    FetchSiteReducer2,
    BannerReducer
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer,
      EnglishBooksReducer2: state.EnglishBooksReducer,
      ArabicBooksReducer2: state.ArabicBooksReducer,
      BookmarksReducer2: state.BookmarksReducer,
      BookmarksReducer: state.BookmarksReducer,
      BookClubReducer: state.BookClubReducer,
      BannerReducer: state.BannerReducer,

    };
  }, shallowEqual);
  if (product_type2 === 'bookmark') book = (BookmarksReducer2.find((item) => item.id == id2))
  if (product_type2 === 'bookclub') book = (BookClubReducer.find((item) => item.id == id2))
  const CombinedReducer = [...ArabicBooksReducer2, ...EnglishBooksReducer2]
  if (product_type2 === 'book') book = (CombinedReducer.find((item) => item.id == id2))



  if (book == null) book = props.route.params;
  console.log(props.route.params, "THIS IS BOOK")
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
    UserProfileReducer
  } = useSelector(
    ({
      CartReducer,
      FetchRelatedBookList,
      EnglishBooksReducer,
      FavouriteReducer,
      UserProfileReducer
    }) => {
      return {
        CartReducer, UserProfileReducer,
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
  useEffect(() => console.log("WORKED BACK ICON"))
  let inCartPosition = CartReducer[product_type].findIndex(
    (el) => el.product_id === product_id,
  );
  const [cartQuantity, SetCartQuantity] = useState(
    inCartPosition !== -1
      ? CartReducer[product_type][inCartPosition].cart_quantity
      :
      1
  )

  const handleCounter = (action) => {
    console.log(book.quantity)
    console.log(action, "action")
    action === 'add' ? cartQuantity < book.quantity && SetCartQuantity(cartQuantity => cartQuantity + 1) : cartQuantity > 1 && SetCartQuantity(cartQuantity => cartQuantity - 1)

    // if (action === 'sub' && inCartPosition !== -1 && CartReducer[product_type][inCartPosition].cart_quantity === 1) {
    //   action = 'remove'
    //   dispatch(
    //     withDataActions(
    //       {
    //         ...book,
    //         cart_quantity: 1,
    //         cart_price: book.prices.find(price => price.id === UserProfileReducer.currency.id).price,
    //         quantity: cartQuantity,
    //         product_id,
    //         action,
    //         product_type,

    //       },
    //       UPDATE_CART_ITEM,
    //     ),
    //   );
    // }





    //TODO : For restrict counter for maximum quantity and out of stock..
    console.log(action, "ACTION")
    // console.log(CartReducer[product_type][inCartPosition].cart_quantity, "ACTION")

    // if (action === 'sub' && inCartPosition !== -1 && CartReducer[product_type][inCartPosition].cart_quantity === 1) {
    //   action = 'remove'

    // }


  };

  const onAddToCart = () => {
    cartQuantity &&
      dispatch(
        withDataActions(
          {
            ...book,
            cart_quantity: cartQuantity,
            cart_price: cartQuantity * parseFloat(book.prices.find(price => price.id === UserProfileReducer.currency.id).price.toString().replace(",", "")),
            // quantity: cartQuantity,
            product_id,
            action: 'cartadd',
            product_type,

          },
          UPDATE_CART_ITEM,
        ),
      );

    if (
      cartQuantity === 0) {
      const text = I18nManager.isRTL ? "الرجاء إضافة الكمية" : "Please add quantity"
      Platform.OS === 'ios' ?
        Alert.alert(false ? ` ${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : 'OK', }])
        : (
          I18nManager.isRTL ?
            Alert.alert(false ? `${text}` : '', text, [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }])
            : Alert.alert(false ? `${text}` : text, '', [{ text: I18nManager.isRTL ? 'حسنا' : ' ', }, { text: I18nManager.isRTL ? '' : ' ', }, { text: I18nManager.isRTL ? ' ' : null }]
            )
        )



      return;
    }

    dispatch(
      withDataActions({
        ...book,
        cart_quantity: cartQuantity,
        cart_price: cartQuantity * parseFloat(book.prices.find(price => price.id === UserProfileReducer.currency.id).price.toString().replace(",", "")),
        // quantity: cartQuantity,
        product_id,
        action: 'cartadd',
        product_type,

      }, ADD_TO_CART),
    );
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {

      inCartPosition = CartReducer[product_type].findIndex(
        (el) => el.product_id === product_id,
      );
      // console.log((inCartPosition !== -1
      //   ? CartReducer[product_type][inCartPosition].cart_quantity : 0), "THIS ", inCartPosition)
      SetCartQuantity((CartReducer[product_type].findIndex(
        (el) => el.product_id === product_id,
      ) !== -1
        ? CartReducer[product_type][CartReducer[product_type].findIndex(
          (el) => el.product_id === product_id,
        )].cart_quantity : 1))
    });

  })

  const handleFavouriteClick = () => {
    dispatch(withDataActions({ product_id, product_type }, UPDATE_FAVOURITE));
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        // cdmessage: "Habber",
        message:
          "http://line-kw.com/hebr.line-kw.com/public/social_share?redirec_url=BookDetails/" + (type ? old_product.id : product_id) + "/" + (type ? type : product_type)
        // Platform.OS === 'ios' ?
        //   ('habber://BookDetails/' + (type ? old_product.id : product_id) + "/" + (type ? type : product_type)) :
        //   (('http://sturdycyber.cf/index.php?id=' + (type ? old_product.id : product_id) + "&type=" + (type ? type : product_type)))
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
    <Screen noPadding>
      <View key="header">

      </View>
      <View key="content" >
        <ImageBackground
          style={[{

            flex: 1,
            paddingHorizontal: 10,
            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
          },
          Platform.OS === 'ios' ? { paddingTop: hp(3.3) } : { paddingTop: hp(2.8) }]}
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
            title={(type ? I18nManager.isRTL ? props.route.params.arabic_name : props.route.params.name : true)}
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
        <View style={{ width: wp(90), alignSelf: 'center' }}>
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
                  value={I18nManager.isRTL ? book.genre.map((item) => item.arabic_title).join(' | ') : book.genre.map((item) => item.title).join(' | ')}
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
                // value={
                //   inCartPosition !== -1
                //     ? CartReducer[product_type][inCartPosition].cart_quantity
                //     : '0'
                // }
                value={cartQuantity}
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
                  {product_type === 'book' ?
                    <DashboardComponent
                      noTitle
                      // data={EnglishBooksReducer2.filter((item) => item.featured)}
                      data={FetchRelatedBookList}
                      renderComponent={(item) => {
                        return (
                          <RelatedThumbnailBook
                            onPress={() => {
                              props.navigation.push(BOOK_DETAILS_SCREEN, {
                                ...item.item,
                                product_type,
                              });
                            }}
                            url={item.item.image}
                          />)
                      }} />
                    :
                    <DashboardComponent
                      noTitle
                      data={BookmarksReducer2.filter((item) => item.featured)}
                      renderComponent={(item) => {
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
                        )
                      }}
                    />}
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
                    data={BookClubReducer.filter((book) => book.featured).splice(0, 8)}
                    renderComponent={(item) => {
                      console.log(item.item)
                      if (product_type === 'book') {
                        return (
                          <ThumbnailClub
                            onPress={() => {
                              props.navigation.push(BOOK_DETAILS_SCREEN, {
                                ...item.item,
                                product_type: 'bookclub',
                              });
                            }}
                            url={item.item.bookclub_logo}
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
      </View>
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
    paddingVertical: hp(0.3),
  },
});

export default BookDetails;
