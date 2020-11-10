import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { BOOK_DETAILS_SCREEN } from '../constants/Screens';
import { BookCard } from './BookCard';

const BookListContainer = (props) => {
  const { data, navigation } = props;

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString() + item}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      renderItem={(book) => (
        <BookCard
          {...book.item}
          {...props}
          onPress={() =>
            navigation.navigate(BOOK_DETAILS_SCREEN, { ...book.item })
          }
        />
      )}
      ItemSeparatorComponent={() => (
        <View style={{ marginVertical: 20, borderWidth: 0.5, borderColor: 'rgb(200,200,200)' }} />
      )}
      ListEmptyComponent={() => (
        <View>
          <AppText>No Book Available</AppText>
        </View>
      )}
      ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
});
export { BookListContainer };
