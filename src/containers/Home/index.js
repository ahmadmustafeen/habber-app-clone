import React, { useState } from 'react';

import { View, StyleSheet, ImageBackground, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
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
import { checkIfLoading } from 'redux/selectors';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOKCLUBS,
  FETCH_BOOKMARKS,
  FETCH_ENGLISH_BOOKS,
} from 'redux/actionTypes';
import Loader from 'components/Loader';
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
        <View style={{ width: '100%', height: 200 }}>
          <FlatListSlider />
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
        <TitleBarWithIcon label={t('requestBook')} />
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
});
export default Home;
