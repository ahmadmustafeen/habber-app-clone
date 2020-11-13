import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  Counter,
  DashboardComponent,
  ImageSlider,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
  Header,
} from '_components';
import {
  REQUESTBOOKS_SCREEN,
  BOOKLIST_SCREEN,
  BOOK_CLUBS,
  BOOKMARKS,
} from '_constants/Screens';
import { sliderImages } from './dummydata';
import { ThumbnailBook } from '_components/ThumbnailBook';
import { AppText, Button, Screen } from '_components/common';
import { FlatListSlider } from '_components';
import { booksData, booksClub, bookmarkdata } from '_assets/data/dummydata';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withDataActions } from '../../redux/actions/GenericActions';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOK_LISTS,
  FETCH_BOOKCLUBS,
  FETCH_ENGLISH_BOOKS,
  FETCH_RELATED_BOOKS,
} from '../../redux/actionTypes';
import { AD_SCREEN } from '../../constants/Screens';
import BookClubReducer from 'redux/reducers/BookClubReducer';
import { useTheme } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Home = (props) => {
  const { navigate } = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
  const [data_book_club] = useState(booksClub);
  const [bookmark_data] = useState(bookmarkdata);
  const { t } = useTranslation();
  const {
    EnglishBooksReducer,
    ArabicBooksReducer,
    BookmarksReducer,
    BookClubReducer,
  } = useSelector((state) => {
    return {
      EnglishBooksReducer: state.EnglishBooksReducer,
      ArabicBooksReducer: state.ArabicBooksReducer,
      BookmarksReducer: state.BookmarksReducer,
      BookClubReducer: state.BookClubReducer,
    };
  }, shallowEqual);

  const dispatch = useDispatch();
  const { colors } = useTheme();

  return (
    <Screen noPadding>
      <View key="header">
        <Header {...props} />
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
        <View style={{ width: '100%', height: 200 }}>
          <FlatListSlider />
        </View>
        <DashboardComponent
          data={ArabicBooksReducer}
          label="ARABIC BOOK"
          renderComponent={(item) => <ThumbnailBook url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: 'ARABIC BOOK',
              data: ArabicBooksReducer,
              type: 'book',
            })
          }
        />
        <DashboardComponent
          data={EnglishBooksReducer}
          label="ENGLISH BOOK"
          renderComponent={(item) => <ThumbnailBook url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: 'ENGLISH BOOK',
              data: EnglishBooksReducer,
              type: 'book',
            })
          }
        />
        <DashboardComponent
          data={BookClubReducer}
          label="BOOK CLUBS"
          renderComponent={(item) => <ThumbnailClub url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: 'BOOKS CLUB',
              data: BookClubReducer,
            })
          }
        />
        <DashboardComponent
          data={BookmarksReducer}
          renderComponent={(item) => (
            <ThumbnailBookmarks url={item.item.image} />
          )}
          label="BOOKMARKS"
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {
              label: 'BOOKMARKS',
              data: BookmarksReducer,
              type: 'bookmarks',
            })
          }
        />
        <TitleBarWithIcon label="REQUEST BOOKS" />
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
