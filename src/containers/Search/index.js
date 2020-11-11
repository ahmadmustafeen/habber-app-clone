import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Screen, AppText } from '_components/common';
import { withDataActions } from '_redux/actions';
import { SEARCH_BOOKS } from '_redux/actionTypes';
import { Header } from '_components';
import { BookListContainer } from 'components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Search = (props) => {
  const { colors } = useTheme();
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();

  const { SearchBooksReducer } = useSelector(({ SearchBooksReducer }) => {
    return {
      SearchBooksReducer,
    };
  }, shallowEqual);

  onSubmit = () => {
    dispatch(withDataActions({ keyword }, SEARCH_BOOKS));
  };
  console.log('SearchBooksReducer', SearchBooksReducer);
  return (
    <Screen noPadding>
      <View
        key="header"
        style={{ backgroundColor: colors.secondary, padding: 10 }}>
        <Header {...props} />
        <View>
          <TextInput
            style={[styles.textInput, { color: colors.text, backgroundColor: colors.background }]}
            placeholder="Search keyword"
            onChangeText={(val) => setKeyword(val)}
            onSubmitEditing={onSubmit}
          />
          <Icon
            containerStyle={styles.iconStyle}
            name="search1"
            type="antdesign"
          />
        </View>
      </View>
      <View key="content" style={styles.booklist}>
        <BookListContainer data={SearchBooksReducer} />
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  textInput: {
    height: 45,
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  iconStyle: {
    height: '100%',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
  booklist: {
    width: wp(85),
    marginLeft: wp(7.5),
  }
});
export default Search;
