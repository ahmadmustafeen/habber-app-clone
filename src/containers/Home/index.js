import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  ImageBackground,
  I18nManager,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Carousel, { Pagination } from 'react-native-x-carousel';
import { CustomPagination } from '_components/CustomPagination';

import {
  DashboardComponent,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
  Header,
} from '_components';
import { REQUESTBOOKS_SCREEN, BOOKLIST_SCREEN } from '_constants/Screens';
import { sliderImages } from './dummydata';
import { ThumbnailBook } from '_components/ThumbnailBook';
import { Button, Screen } from '_components/common';
import { FlatListSlider } from '_components';
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
import { withoutDataActions } from 'redux/actions';
import { AppText } from 'components/common';
import { Icon } from 'react-native-elements';
const { width } = Dimensions.get('window');
const Home = (props) => {
  const { navigate } = props.navigation;
  const [images] = useState(sliderImages);

  const { t } = useTranslation();
  const {
    EnglishBooksReducer,
    ArabicBooksReducer,
    BookmarksReducer,
    BookClubReducer,
    isLoading,

  } = useSelector((state) => {
    return {
      EnglishBooksReducer: state.EnglishBooksReducer,
      ArabicBooksReducer: state.ArabicBooksReducer,
      BookmarksReducer: state.BookmarksReducer,
      BookClubReducer: state.BookClubReducer,
      isLoading: checkIfLoading(
        state,
        FETCH_ENGLISH_BOOKS,
        FETCH_ARABIC_BOOKS,
        FETCH_BOOKCLUBS,
        FETCH_BOOKMARKS,
      ),
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const { colors } = useTheme();
  console.log('IS LOADING  . . . ', isLoading);

  const DATA = [
    {
      coverImageUri:
        'https://user-images.githubusercontent.com/6414178/73920321-2357b680-4900-11ea-89d5-2e8cbecec9f6.jpg',
      cornerLabelColor: '#FFD300',
      cornerLabelText: 'GOTY',
    },
    {
      coverImageUri:
        'https://user-images.githubusercontent.com/6414178/73920358-336f9600-4900-11ea-8eec-cc919b991e90.jpg',
      cornerLabelColor: '#0080ff',
      cornerLabelText: 'NEW',
    },
    {
      coverImageUri:
        'https://user-images.githubusercontent.com/6414178/73927874-25744200-490d-11ea-940f-db3e5dbd8b2b.jpg',
      cornerLabelColor: '#2ECC40',
      cornerLabelText: '-75%',
    },
    {
      coverImageUri:
        'https://user-images.githubusercontent.com/6414178/73920399-45e9cf80-4900-11ea-9d5b-743fe5e8b9a4.jpg',
      cornerLabelColor: '#2ECC40',
      cornerLabelText: '-20%',
    },
  ];
  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={{ zIndex: 5, width: wp(80), alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', position: 'absolute', top: hp(2.5), }}>
        <Icon
          color={"white"}
          size={17}
          name="left"
          type="ant-design"
        />
        <Icon
          color={"white"}
          size={17}
          name="right"
          type="ant-design"
        />
      </View>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={{ uri: data.coverImageUri }} />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}>
          <AppText style={styles.cornerLabelText}>
            {data.cornerLabelText}
          </AppText>
        </View>
      </View>
    </View>
  );


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
          resizeMode="stretch"
          source={require('_assets/images/header.png')}>
          <Header {...props} />
        </ImageBackground>

        {/* <AppText>{t('hello')}</AppText>
        <AppText>{t('bye')}</AppText> */}
        {/* <Button onPress={() => navigate('Auth', { screen: AD_SCREEN })}>
          Auth Navigation
        </Button>
        <Button
          onPress={() => dispatch(withDataActions('', FETCH_ENGLISH_BOOKS))}>
          Fetch English Books
        </Button>
        <Button
          onPress={() => dispatch(withDataActions('', FETCH_ARABIC_BOOKS))}>
          Fetch Arabic Books
        </Button>
        <Button
          onPress={() => dispatch(withDataActions('', FETCH_BOOKCLUBS))}>
          Fetch BookClubs
        </Button>
        <Button
          onPress={() => dispatch(withDataActions('', FETCH_RELATED_BOOKS))}>
          Fetch Related Books
        </Button> */}
      </View>

      <View key="content" style={styles.container}>


        <Loader loading={isLoading} />

        <View style={styles.cContainer}>
          <Carousel
            pagination={CustomPagination}
            renderItem={renderItem}
            data={DATA}
          />
        </View>
        <DashboardComponent
          data={ArabicBooksReducer.filter((book) => book.featured)}
          label={t('arabic')}
          renderComponent={(item) => <ThumbnailBook url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: t('arabic'),
              data: ArabicBooksReducer,
              product_type: 'book',
            })
          }
        />
        <DashboardComponent
          data={EnglishBooksReducer.filter((book) => book.featured)}
          label={t('english')}
          renderComponent={(item) => <ThumbnailBook url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: t('english'),
              data: EnglishBooksReducer,
              product_type: 'book',
            })
          }
        />
        <DashboardComponent
          data={BookClubReducer.filter((book) => book.featured)}
          label={t('bookclub')}
          renderComponent={(item) => <ThumbnailClub url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: t('bookclub'),
              data: BookClubReducer,
              product_type: 'bookclub',
            })
          }
        />
        <DashboardComponent
          data={BookmarksReducer.filter((book) => book.featured)}
          renderComponent={(item) => (
            <ThumbnailBookmarks url={item.item.image} />
          )}
          label={t('bookmark')}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: t('bookmark'),
              data: BookmarksReducer,
              product_type: 'bookmark',
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
              Request Book
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
              Request Educational Book
            </Button>
          </View>
        </View>
      </View>
    </Screen>

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
    alignItems: 'center',
    justifyContent: 'center',
    width,
    marginBottom: 30,
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
