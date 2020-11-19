import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {AppText} from './common/AppText';
import {BOOK_DETAILS_SCREEN} from '../constants/Screens';
import {BookmarkCard} from './BookmarkCard';
import {BookCard} from './BookCard';
// import { colors } from 'react-native-elements';

const BookListContainer = (props) => {
  const {data, navigation, product_type, numColumns} = props;
  console.log(product_type);
  const {colors} = useTheme();
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString() + item}
      columnWrapperStyle={{justifyContent: 'space-evenly'}}
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
          <AppText>No Book Available</AppText>
        </View>
      )}
      ListFooterComponent={() => <View style={{paddingBottom: 50}} />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({});
export {BookListContainer};
