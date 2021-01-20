import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { AppText } from './common/AppText';
import { BOOK_DETAILS_SCREEN } from '../constants/Screens';
import { BookmarkCard } from './BookmarkCard';
import { BookCard } from './BookCard';
import { BookClub } from './BookClub';
import NoBookAvailbe from './NoBookAvailable';
import { I18nManager } from 'react-native';

const BookListContainer = (props) => {
  const { data, navigation, product_type } = props;

  const { colors } = useTheme();
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString() + item}
      columnWrapperStyle={styles.columnWrapperStyle}
      numColumns={product_type === 'bookmark' ? 3 : 2}
      renderItem={(book) => {
        if (product_type === 'bookmark') {
          return (
            <BookmarkCard
              {...book.item}
              {...props}
              onPress={() =>
                navigation.navigate(BOOK_DETAILS_SCREEN, {
                  ...book.item,
                  product_type,
                })
              }
            />
          );
        }
        if (product_type === 'bookclub') {
          return (
            <BookClub
              {...book.item}
              {...props}
              onPress={() =>
                navigation.navigate(BOOK_DETAILS_SCREEN, {
                  ...book.item,
                  product_type,
                })
              }
            />
          );
        }
        return (
          <BookCard
            {...book.item}
            {...props}
            onPress={() =>
              navigation.navigate(BOOK_DETAILS_SCREEN, {
                ...book.item,
                product_type,
              })
            }
          />
        );
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            marginVertical: 20,
            borderWidth: 0.5,
            borderColor: colors.borderColor,
          }}
        />
      )}
      ListEmptyComponent={() => (
        <View>
          {/* <AppText></AppText> */}
          <NoBookAvailbe title={I18nManager.isRTL ? 'لا يوجد شيء لعرضه هنا!' : 'Nothing to Show here!'} />
        </View>
      )}
      ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-evenly'
  }
});
export { BookListContainer };
