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
} from '_components';
import {REQUESTBOOKS, BOOK_CLUBS} from '_constants/Screens';
import {sliderImages} from './dummydata';
import {ThumbnailBook} from '_components/ThumbnailBook';
import {AppText, Button, Screen} from '_components/common';
import {BOOKLIST_SCREEN, LANGUAGE_SCREEN} from '_constants/Screens';
import {booksData} from '_assets/data/dummydata';
import Header from '_components/Header';
import {useDispatch} from 'react-redux';
import {withDataActions} from '../../redux/actions/basicActions';
import {SIGN_UP} from '../../redux/actionTypes';
import {AD_SCREEN} from '../../constants/Screens';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
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
        {/* <Button onPress={() => dispatch(withDataActions('Hello', SIGN_UP))}>
                SignUp
              </Button> */}
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
          data={data}
          renderComponent={(item) => <ThumbnailClub url={item.item.image} />}
          label="BOOK CLUBS"
          onIconPress={() => navigate(BOOK_CLUBS, {label: 'BOOKS CLUB', data})}
        />
        <DashboardComponent
          data={data}
          renderComponent={(item) => (
            <ThumbnailBookmarks url={item.item.image} />
          )}
          label="BOOKMARKS"
        />
        <TitleBarWithIcon label="REQUEST BOOKS" />
        <View style={styles.requestBooksBtns}>
          <View style={{width: '29%'}}>
            <Button borderRadius={2} secondary fontSize={15}>
              Request Book
            </Button>
          </View>
          <View style={{width: '69%'}}>
            <Button borderRadius={2} primary fontSize={15}>
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
  },
});
export default Home;
