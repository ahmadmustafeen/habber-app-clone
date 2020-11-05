import React, {useState} from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {
  Counter,
  BookDetailsCard,
  HorizontalRow,
  Header,
} from '../../components';
import {booksData} from '_assets/data/dummydata';
import {ADD_TO_CART} from '../../constants/Screens';

const BookDetails = (props) => {
  const {
    route: {params},
    navigation: {navigate},
  } = props;
  const {title, isbn, total_pages, description, cover_type} = params;
  console.log('BookDetails', params);
  return (
    <Screen noPadding contentPadding>
      <View key="header">
        <Header {...props} title={title} />
      </View>
      <View key="content">
        <BookDetailsCard {...params} />
        <HorizontalRow />
        <View>
          <AppText bold size={15} primary>
            ISBN: {isbn}
          </AppText>
          <AppText bold size={15}>
            Pages: {total_pages}
          </AppText>
          <AppText bold size={15}>
            Type of Cover: {cover_type}
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
      </View>
      <View key="footer">
        <View style={styles.counter}>
          <Counter />
        </View>
        <Button
          bold
          secondary
          onPress={() => props.navigation.navigate(ADD_TO_CART)}>
          Add To Cart
        </Button>
      </View>
    </Screen>
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
