import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {BookCard, TitleBarWithIcon} from '../../components';
import {AppText, Screen} from '../../components/common';

import {Color} from '../../constants/Colors';
import {bookListData} from './dummydata';

const BooksList = (props) => {
  const {label} = props.route.params;
  return (
    <View>
      <TitleBarWithIcon label={label} />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={bookListData}
        renderItem={(book) => <BookCard {...book.item} />}
        ItemSeparatorComponent={() => (
          <View style={{margin: 20, borderWidth: 0.5}} />
        )}
        ListEmptyComponent={() => (
          <View>
            <AppText>No Book Available</AppText>
          </View>
        )}
        ListFooterComponent={() => <View style={{paddingBottom: 50}} />}
      />
    </View>
  );
};
export default BooksList;
