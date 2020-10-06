import React, {useState} from 'react';

import {ScrollView, View, StyleSheet, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {
  Counter,
  DashboardComponent,
  ImageSlider,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
} from '../../components';
import {sliderImages} from './dummydata';
import {ThumbnailBook} from '_components/ThumbnailBook';
import {AppText, Button} from '_components/common';
import {BOOKLIST_SCREEN, LANGUAGE_SCREEN} from '_constants/Screens';
import {booksData} from '_assets/data/dummydata';
import Header from '_components/Header';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
  const {t, i18n} = useTranslation();
  console.log('isRTL', I18nManager.isRTL, 'Language', i18n.language);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header {...props} />
      <AppText>{t('hello')}</AppText>
      <AppText>{t('bye')}</AppText>
      <ImageSlider images={images} />
      <Button onPress={() => navigate('Auth', {screen: LANGUAGE_SCREEN})}>
        Auth Navigation
      </Button>
      <Button
        onPress={() =>
          i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar').then(() => {
            I18nManager.forceRTL(i18n.language === 'ar');
            RNRestart.Restart();
          })
        }>
        Language
      </Button>
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
        onIconPress={() =>
          navigate(BOOKLIST_SCREEN, {label: 'BOOKS CLUB', data})
        }
      />
      <DashboardComponent
        data={data}
        renderComponent={(item) => <ThumbnailBookmarks url={item.item.image} />}
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  requestBooksBtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Home;
