import React from 'react';
import {FlatList, View} from 'react-native';
import {BookCard, TitleBarWithIcon} from '../../components';

import {AppText} from '../../components/common';

const BooksList = (props) => {
  const {label, data} = props.route.params;

  return (
    <View>
      <TitleBarWithIcon label={label} />

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString() + item}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        renderItem={(book) => <BookCard {...book.item} />}
        ItemSeparatorComponent={() => (
          <View style={{marginVertical: 20, borderWidth: 0.5}} />
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
