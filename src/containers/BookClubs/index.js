import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {AppText, Button, Screen} from '../../components/common';
import {HorizontalRow, Header} from '../../components';
import {BOOK_DESCRIPTION} from '../../constants/Screens';

const BookClubs = (props) => {
  return (
    <ScrollView>
      <Header {...props} title={'Book Clubs'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/stephen.png')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                Little Brown & Company
              </AppText>
            </View>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Screenshot_Logo.jpg')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                The Big Book Club
              </AppText>
            </View>
          </View>
          <HorizontalRow />

          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Screenshot_Logo.jpg')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                Sunshine Book Club
              </AppText>
            </View>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/stephen.png')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                Free Minds Book Club
              </AppText>
            </View>
          </View>
          <HorizontalRow />

          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/stephen.png')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                Action Book Club
              </AppText>
            </View>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Screenshot_Logo.jpg')}
              />
              <AppText
                style={styles.bookname}
                onPress={() => props.navigation.navigate(BOOK_DESCRIPTION)}>
                Andrew Book Club
              </AppText>
            </View>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 150,
    aspectRatio: 1.25,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewtxt: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: '100%',
  },
  bookname: {
    marginTop: 5,
    height: 50,
  },
  pricetxt: {
    marginTop: 20,
    width: 200,
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default BookClubs;
