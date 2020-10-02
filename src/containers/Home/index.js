import React, {useState} from 'react';

import {ScrollView, View, StyleSheet} from 'react-native';

import {
  DashboardComponent,
  ImageSlider,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
} from '../../components';
import {sliderImages} from './dummydata';
import {ThumbnailBook} from '../../components/ThumbnailBook';
import {AppText, Button} from '../../components/common';
import {BOOKLIST_SCREEN, LANGUAGE_SCREEN} from '../../constants/Screens';
import {booksData} from '../../assets/data/dummydata';
import Header from '../../components/Header';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header {...props} />
      <ImageSlider images={images} />
      <Button onPress={() => navigate('Auth', {screen: LANGUAGE_SCREEN})}>
        Auth Navigation
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
