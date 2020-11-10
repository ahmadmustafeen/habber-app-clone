import { BookListContainer } from 'components';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TitleBarWithIcon, Header } from '_components';

const BooksList = (props) => {
  const {
    route: {
      params: { label, data },
    },
    navigation: { navigate },
  } = props;

  return (
    <ScrollView >
      <Header {...props} />
      <View style={styles.book}>
        <View style={styles.width}>
          <TitleBarWithIcon label={label} />
          <BookListContainer data={data} {...props} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  book: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  width: {
    width: '90%',
  }
})
export default BooksList;
