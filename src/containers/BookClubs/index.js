import React from 'react';
import { FlatList, View, ScrollView } from 'react-native';
import { BookCard, TitleBarWithIcon, Header } from '_components';

import { AppText } from '_components/common';

import { BOOK_DETAILS_SCREEN } from '_constants/Screens';

const BookClubs = (props) => {
  const {
    route: {
      params: { label, data },
    },
    navigation: { navigate },
  } = props;

  return (
    <ScrollView>
      <Header {...props} />
      <TitleBarWithIcon label={label} />

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
            onPress={() => navigate(BOOK_DETAILS_SCREEN, { ...book.item })}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ marginVertical: 20, borderWidth: 0.5 }} />
        )}
        ListEmptyComponent={() => (
          <View>
            <AppText>No Book Available</AppText>
          </View>
        )}
        ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
      />
    </ScrollView>
  );
};

export default BookClubs;
