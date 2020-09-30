import React, {useState} from 'react';

import {ScrollView, View, StyleSheet} from 'react-native';

import {
  DashboardComponent,
  ImageSlider,
  ThumbnailBookmarks,
  ThumbnailClub,
  TitleBarWithIcon,
} from '../../components';
import {booksData, sliderImages} from './dummydata';
import {ThumbnailBook} from '../../components/ThumbnailBook';
import {AppText, Button} from '../../components/common';
import {BOOKLIST_SCREEN} from '../../constants/Screens';

const Home = (props) => {
  const {navigate} = props.navigation;
  const [images] = useState(sliderImages);
  const [data] = useState(booksData);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageSlider images={images} />
      <DashboardComponent
        data={data}
        label="ENGLISH BOOK"
        renderComponent={(item) => <ThumbnailBook url={item.image} />}
      />
      <DashboardComponent
        data={data}
        renderComponent={(item) => <ThumbnailClub url={item.image} />}
        label="BOOK CLUBS"
        onIconPress={() => navigate(BOOKLIST_SCREEN, {label: 'BOOKS CLUB'})}
      />
      <DashboardComponent
        data={data}
        renderComponent={(item) => <ThumbnailBookmarks url={item.image} />}
        label="BOOKMARKS"
      />
      <TitleBarWithIcon label="REQUEST BOOKS" />
      <View style={styles.requestBooks}>
        <View style={{width: '29%'}}>
          <Button secondary fontSize={15}>
            Request Book
          </Button>
        </View>
        <View style={{width: '69%'}}>
          <Button primary fontSize="15">
            Request Educational Book
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  requestBooks: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Home;
