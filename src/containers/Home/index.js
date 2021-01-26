import React, { useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  ImageBackground,
  I18nManager,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-community/google-signin';
import { CustomPagination } from '_components/CustomPagination';
import { FloatingAction } from 'react-native-floating-action';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  DashboardComponent,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
  Header,
  FloatingActionButton,
} from '_components';
import {
  REQUESTBOOKS_SCREEN,
  BOOKLIST_SCREEN,
  BOOK_DETAILS_SCREEN,
} from '_constants/Screens';
import { sliderImages } from './dummydata';
import { ThumbnailBook } from '_components/ThumbnailBook';
import { Button, Screen } from '_components/common';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { checkIfLoading } from '_redux/selectors';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOKCLUBS,
  FETCH_BOOKMARKS,
  FETCH_ENGLISH_BOOKS,
} from '_redux/actionTypes';
import Loader from '_components/Loader';
import { AppText } from 'components/common';
import { Icon } from 'react-native-elements';

export const itemWidth = wp(85);
import { FETCH_BANNER } from '../../redux/actionTypes';
const { width } = Dimensions.get('window');
const Home = (props) => {
  const CAROUSEL = useRef(null);
  const { navigate } = props.navigation;
  const [images] = useState(sliderImages);
  const [activeSlide, setActiveSlide] = useState(0)
  const { t } = useTranslation();
  const {
    UserProfileReducer,
    EnglishBooksReducer,
    ArabicBooksReducer,
    BookmarksReducer,
    BookClubReducer,
    FetchSiteReducer,
    isLoading,
    BannerReducer
  } = useSelector((state) => {
    return {
      UserProfileReducer: state.UserProfileReducer,
      FetchSiteReducer: state.FetchSiteReducer,
      EnglishBooksReducer: state.EnglishBooksReducer,
      ArabicBooksReducer: state.ArabicBooksReducer,
      BookmarksReducer: state.BookmarksReducer,
      BookClubReducer: state.BookClubReducer,
      BannerReducer: state.BannerReducer,
      isLoading: checkIfLoading(
        state,
        FETCH_ENGLISH_BOOKS,
        FETCH_ARABIC_BOOKS,
        FETCH_BOOKCLUBS,
        FETCH_BOOKMARKS,
        FETCH_BANNER
      ),
    };
  }, shallowEqual);
  // console.log("BookmarkReducer  home ", BookmarksReducer);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const DATA = BannerReducer.map(({ banner_image, product }) => ({ coverImageUri: banner_image, product }));
  // console.log("BANNER REDUCER ", BannerReducer)

  const panig = DATA.splice(0, 3)
  // console.log("BANNER PAGINATION ", panig)




  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.coverImageUri} style={styles.cardContainer}
        onPress={() => {
          navigate(BOOK_DETAILS_SCREEN, {
            ...item.product,
            product_type: item.product.product_type
          })
        }
        }>
        <View
          style={{
            zIndex: 5,
            width: wp(80),
            justifyContent: 'space-between',
            // flexDirection: 'row',
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',

            position: 'absolute',
            top: hp(2.5),
            paddingHorizontal: 20,
          }}>
          <Icon
            color={'white'}
            size={17}
            name="left"
            type="ant-design"
            onPress={() =>
              I18nManager.isRTL ? CAROUSEL.current ? CAROUSEL.current.snapToNext() : null : (CAROUSEL.current ? CAROUSEL.current.snapToPrev() : null)


            }
          />
          <Icon
            color={'white'}
            size={17}
            name="right"
            type="ant-design"
            onPress={() =>
              I18nManager.isRTL ? CAROUSEL.current ? CAROUSEL.current.snapToPrev() : null : (CAROUSEL.current ? CAROUSEL.current.snapToNext() : null)

            }
          />
        </View>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={{ uri: item.coverImageUri }} />
          <View
            style={[
              styles.cornerLabel,
              { backgroundColor: item.cornerLabelColor },
            ]}>
            <AppText style={styles.cornerLabelText}>
              {item.cornerLabelText}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>

    )
  };

  return (
    <>
      <Screen noPadding>
        <View key="header">
          <Header {...props} headerImage />
          <Carousel

            ref={CAROUSEL}
            renderItem={renderItem}
            data={panig}
            sliderWidth={width}
            inactiveSlideScale={1}
            inactiveSlideOpacity={0.5}
            autoplay
            enableSnap
            onSnapToItem={(index) => setActiveSlide(index)}

            snapOnAndroid={true} //to enable snapping on android
            itemWidth={itemWidth}
            slideStyle={styles.slide}
            loop
          />
          <Pagination
            dotsLength={panig.length}
            inactiveDotScale={1}
            inactiveDotColor={colors.borderColor}
            dotColor={colors.primary}
            activeDotIndex={activeSlide}
            containerStyle={{ width: wp(30), paddingVertical: hp(1), alignSelf: 'center' }}
            dotStyle={{
              width: wp(7),
              marginHorizontal: wp(0),
              height: hp(0.5),
              borderRadius: 5,
            }}
          />

        </View>

        <View key="content" style={styles.container}>

          <Loader loading={isLoading} />

          <DashboardComponent
            data={ArabicBooksReducer.filter((book) => book.featured).splice(0, 8)}
            label={t('arabicBook')}
            renderComponent={(item) => (
              <ThumbnailBook
                url={item.item.image}
                onPress={() =>
                  navigate(BOOK_DETAILS_SCREEN, {
                    ...item.item,
                    product_type: item.item.product_type,
                  })
                }
              />
            )}
            onIconPress={() =>
              navigate(BOOKLIST_SCREEN, {
                label: t('arabicBook'),
                data: ArabicBooksReducer,
                product_type: 'book',
              })
            }
          />
          <DashboardComponent
            data={EnglishBooksReducer.filter((book) => book.featured).splice(0, 8)}
            label={t('englishBook')}
            renderComponent={(item) => (
              <ThumbnailBook
                url={item.item.image}
                onPress={() =>
                  navigate(BOOK_DETAILS_SCREEN, {
                    ...item.item,
                    product_type: item.item.product_type,
                  })
                }
              />
            )}
            onIconPress={() =>
              navigate(BOOKLIST_SCREEN, {
                label: t('englishBook'),
                data: EnglishBooksReducer,
                product_type: 'book',
              })
            }
          />
          <DashboardComponent
            data={BookClubReducer.filter((book) => book.featured).splice(0, 8)}
            label={t('bookclub')}
            renderComponent={(item) => (
              <ThumbnailClub
                url={item.item.bookclub_logo}
                onPress={() =>
                  navigate(BOOK_DETAILS_SCREEN, {
                    ...item.item,
                    product_type: item.item.product_type,
                  })
                }
              />
            )}
            onIconPress={() =>
              navigate(BOOKLIST_SCREEN, {
                label: t('bookclub'),
                data: BookClubReducer,
                product_type: 'bookclub',
              })
            }
          />
          <DashboardComponent
            data={BookmarksReducer.filter((book) => book.featured).splice(0, 8)}
            renderComponent={(item) => (
              <ThumbnailBookmarks
                url={item.item.image}
                onPress={() =>
                  navigate(BOOK_DETAILS_SCREEN, {
                    ...item.item,
                    product_id: item.item.id,
                    author_name: item.item.maker_name,
                    product_type: item.item.product_type,
                  })
                }
              />
            )}
            label={t('bookmark')}
            onIconPress={() =>
              navigate(BOOKLIST_SCREEN, {
                label: t('bookmark'),
                data: BookmarksReducer,
                product_type: "bookmark",
              })
            }
          />
          <TitleBarWithIcon label={t('requestBook')} noIcon />
          <View style={styles.requestBooksBtns}>
            <View style={{ width: wp(28) }}>
              <Button
                bold
                color={colors.white}
                borderRadius={2}
                secondary
                fontSize={13}
                onPress={() =>
                  navigate(REQUESTBOOKS_SCREEN, { book_type: 'random' })
                }>
                {t('requestBook')}
              </Button>
            </View>
            <View style={{ width: wp(58) }}>
              <Button
                // bold
                borderRadius={2}
                primary
                fontSize={13}
                onPress={() =>
                  navigate(REQUESTBOOKS_SCREEN, { book_type: 'educational' })
                }>
                {t('requestEducationalBook')}
              </Button>
            </View>
          </View>
        </View>
      </Screen>
      <FloatingActionButton
        image={require('_assets/images/fab.png')}
        onPress={() =>
          Linking.openURL(
            `whatsapp://send?text=""&phone=${FetchSiteReducer.whatsaap_number}`,
          ).catch((err) => console.log('Err', err))
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingStart: 10,
    marginLeft: 10,
    width: '95%',
  },

  requestBooksBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
    paddingBottom: 20,
  },
  cContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  cardWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Home;
