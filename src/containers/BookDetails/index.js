import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {
  RoundIcon,
  Counter,
  DashboardComponent,
  ThumbnailClub,
  BookDetailsCard,
  HorizontalRow,
  Header,
} from '_components';
import {booksData} from '_assets/data/dummydata';
import {ADD_TO_CART} from '../../constants/Screens';

const BookDetails = (props) => {
  const [data] = useState(booksData);
  const {
    route: {params},
    navigation: {navigate},
  } = props;
  const {author, image, price, title, description} = params;
  console.log('BookDetails', props);
  return (
    <ScrollView>
      <Header {...props} title={'Book Name'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <BookDetailsCard {...params} />
          <HorizontalRow />
          <View>
            <AppText bold size={15} primary>
              ISBN: 978-3-16-141500-0
            </AppText>
            <AppText bold size={15}>
              Pages: 160
            </AppText>
            <AppText bold size={15}>
              Type of Cover: Hard Cover
            </AppText>
            <AppText bold size={15}>
              Genre: Romance|Thriller|Mystery
            </AppText>
          </View>
          <HorizontalRow />
          <View style={{marginTop: 20}}>
            <AppText bold style={{marginBottom: 10}}>
              Description:
            </AppText>
            <AppText size={14}>{description}</AppText>
          </View>

          <View style={styles.counter}>
            <Counter />
          </View>
        </View>
        <View key="footer">
          <Button bold secondary onPress={() => props.navigation.navigate(ADD_TO_CART)}>
            Add To Cart
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default BookDetails;
