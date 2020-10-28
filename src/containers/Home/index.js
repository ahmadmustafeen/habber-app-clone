import React, {useState} from 'react';

import {ScrollView, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
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
import {sliderImages} from './dummydata';
import {ThumbnailBook} from '_components/ThumbnailBook';
import {AppText, Button, Screen} from '_components/common';
import {booksData, booksClub, bookmarkdata} from '_assets/data/dummydata';
import {useDispatch} from 'react-redux';
import {withDataActions} from '../../redux/actions/GenericActions';
import {
  FETCH_ARABIC_BOOKS,
  FETCH_BOOK_LISTS,
  FETCH_ENGLISH_BOOKS,
  FETCH_RELATED_BOOKS,
} from '../../redux/actionTypes';
import {AD_SCREEN} from '../../constants/Screens';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
  const [data_book_club] = useState(booksClub);
  const [bookmark_data] = useState(bookmarkdata);
  const {t} = useTranslation();

  const dispatch = useDispatch();
  return (
    <Screen noPadding>
      <View key="header">
        <Header {...props} />
        <AppText>{t('hello')}</AppText>
        <AppText>{t('bye')}</AppText>
        <Button onPress={() => navigate('Auth', {screen: AD_SCREEN})}>
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
          onPress={() => dispatch(withDataActions('', FETCH_RELATED_BOOKS))}>
          Fetch Related Books
        </Button>
        <ImageSlider images={images} />
      </View>
      <View key="content" style={{paddingStart: 10}}>
        <DashboardComponent
          data={data}
          label="ENGLISH BOOK"
          renderComponent={(item) => <ThumbnailBook url={item.item.image} />}
          onIconPress={() =>
            navigate(BOOKLIST_SCREEN, {label: 'ENGLISH BOOK', data})
          }
        />
        <DashboardComponent
          data={data_book_club}
          renderComponent={(item) => <ThumbnailClub url={item.item.image} />}
          label="BOOK CLUBS"
          onIconPress={() =>
            navigate(BOOK_CLUBS, {label: 'BOOKS CLUB', data_book_club})
          }
        />
        <DashboardComponent
          data={bookmark_data}
          renderComponent={(item) => (
            <ThumbnailBookmarks url={item.item.image} />
          )}
          label="BOOKMARKS"
          onIconPress={() =>
            navigate(BOOKMARKS, {label: 'BOOKMARKS', bookmark_data})
          }
        />
        <TitleBarWithIcon label="REQUEST BOOKS" />
        <View style={styles.requestBooksBtns}>
          <View style={{width: '29%'}}>
            <Button
              borderRadius={2}
              secondary
              fontSize={15}
              onPress={() =>
                navigate(REQUESTBOOKS_SCREEN, {book_type: 'random'})
              }>
              Request Book
            </Button>
          </View>
          <View style={{width: '69%'}}>
            <Button
              borderRadius={2}
              primary
              fontSize={15}
              onPress={() =>
                navigate(REQUESTBOOKS_SCREEN, {book_type: 'educational'})
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
  requestBooksBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
    paddingBottom: 20,
  },
});
export default Home;
