import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {View, StyleSheet, Text, TextInput, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {Screen, AppText} from '_components/common';
import {withDataActions} from '_redux/actions';
import {SEARCH_BOOKS} from '_redux/actionTypes';
import {
  BookListContainer,
  FilterModal,
  TitleBarWithIcon,
  Header,
} from '_components';
import useFilter from '_utils/customHooks/useFilter';

const Search = (props) => {
  const {navigate} = props.navigation;
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const {visible, toggleFilter} = useFilter();
  const dispatch = useDispatch();

  const {SearchBooksReducer} = useSelector(({SearchBooksReducer}) => {
    return {
      SearchBooksReducer,
    };
  }, shallowEqual);

  const onSubmit = () => {
    dispatch(withDataActions({keyword}, SEARCH_BOOKS));
  };

  const onApplyFilter = (item) => {
    console.log(item);
    toggleFilter();
  };
  console.log('SearchBooksReducer', SearchBooksReducer);
  return (
    <Screen noPadding>
      <View
        key="header"
        style={{backgroundColor: colors.secondary, padding: 10}}>
        <Header {...props} />
        <View>
          <TextInput
            style={styles.textInput}
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
      <View key="content">
        <TitleBarWithIcon label="Helo" onIconPress={toggleFilter} />
        <BookListContainer data={SearchBooksReducer} />
        <FilterModal {...props} visible={visible} onApply={onApplyFilter} />
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
    color: '#000000',
    backgroundColor: '#fff',
  },
  iconStyle: {
    height: '100%',
    position: 'absolute',
    right: 20,
    justifyContent: 'center',
  },
});
export default Search;
